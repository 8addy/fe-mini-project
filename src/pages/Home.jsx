import { Button, Container, Grid, Typography } from "@mui/material";
import SingleArticle from "components/articles/singleArticle/SingleArticle";
import { AuthContext } from "context/AuthContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.css";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { GlobalContext } from "context/GlobalContext";
import { ADMIN_ROLE_ID } from "constants/constants";
import ClearIcon from "@mui/icons-material/Clear";
import ArticleModal from "components/ArticleModal/ArticleModal";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { isSearchMode, isSearchLoading, searchResult, clearSearch } =
    useContext(GlobalContext);
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articleToUpdate, setArticleToUpdate] = useState(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [deleteArticleId, setDeletedArticleId] = useState(false);
  const refPagination = useRef({ page: 0, size: 12, isNoMoreArticle: false });

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { page, size } = refPagination.current;
      const response = await fetch(
        `http://localhost:8080/api/v1/articles?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setArticles((prevArticles) =>
          prevArticles ? [...prevArticles, ...result] : result
        );
        refPagination.current.page = page + 1;
        if (result?.length === 0) refPagination.current.isNoMoreArticle = true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (isSearchLoading) setLoading(true);
    else setLoading(false);
    if (isSearchMode && !isSearchLoading) {
      if (searchResult?.length > 0) {
        setArticles(searchResult);
      } else setArticles([]);
    }
  }, [isSearchMode, isSearchLoading, searchResult]);

  const clearSearchHandler = () => {
    refPagination.current = { page: 0, size: 12, isNoMoreArticle: false };
    setArticles(null);
    clearSearch();
    fetchArticles();
  };

  const editArticleHandler = (article) => {
    setIsArticleModalOpen(true);
    setArticleToUpdate(article);
  };
  const closeArticleModalHandler = () => {
    setIsArticleModalOpen(false);
    setArticleToUpdate(null);
    setDeletedArticleId(false);
  };
  const removeArticleHandler = (id) => {
    setIsArticleModalOpen(true);
    setDeletedArticleId(id);
  }

  const updateStateArticle = (updatedArticle, isRemovedId) => {
    if (isRemovedId) {
        return setArticles(prev => prev.filter(item => item.id !== isRemovedId));
    }
    setArticles(prev => prev.map(item => {
        if (item.id === updatedArticle.id) return updatedArticle;
        else return item;
    }));
  }

  return (
    <div className="articles_container">
      {isArticleModalOpen && user?.roleId === ADMIN_ROLE_ID && (
        <ArticleModal
          isArticleModalOpen={isArticleModalOpen}
          closeModal={closeArticleModalHandler}
          articleToUpdate={articleToUpdate}
          updateStateArticle={updateStateArticle}
          user={user}
          deleteArticleId={deleteArticleId}
        />
      )}
      <Container maxWidth="xl">
        <div className="articles_container_toolbar">
          <Typography textAlign="left" mb={4} variant="h5" component="h2">
            {isSearchMode ? "Search result: " : "Articles: "}
          </Typography>
          {isSearchMode && (
            <Button
              className="clear_search"
              sx={{ mr: 2, ml: 4, mb: 4 }}
              startIcon={<ClearIcon />}
              color="inherit"
              onClick={clearSearchHandler}
            >
              {articles?.length > 0 ? "Clear Search" : "Reload All Articles"}
            </Button>
          )}
          {user?.roleId === ADMIN_ROLE_ID && (
            <Button
              sx={{ mr: 2, ml: 4, mb: 4 }}
              startIcon={<AddIcon />}
              color="inherit"
              onClick={() => setIsArticleModalOpen(true)}
            >
              Add Article
            </Button>
          )}
        </div>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
          {articles?.length > 0 ? (
            articles?.map((article) => (
              <SingleArticle
                key={article?.id}
                article={article}
                roleId={user?.roleId}
                editArticle={() => editArticleHandler(article)}
                deleteArticle={() => removeArticleHandler(article.id)}
              />
            ))
          ) : (
            <Typography
              sx={{ width: "100%" }}
              textAlign="center"
              color="#777"
              mt={5}
              variant="h6"
              component="h2"
            >
              No article available!
            </Typography>
          )}
        </Grid>
        {!isSearchMode && !refPagination.current.isNoMoreArticle && (
          <LoadingButton
            onClick={fetchArticles}
            loading={loading}
            loadingIndicator="Loading…"
            variant="outlined"
            sx={{ margin: 5 }}
          >
            <span>Load more</span>
          </LoadingButton>
        )}
      </Container>
    </div>
  );
};

export default Home;
