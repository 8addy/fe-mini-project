import { Container, Grid, Typography } from '@mui/material'
import SingleArticle from 'components/articles/singleArticle/SingleArticle';
import { AuthContext } from 'context/AuthContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './Home.css';
import { LoadingButton } from '@mui/lab';
import { GlobalContext } from 'context/GlobalContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { isSearchMode, isSearchLoading, searchResult, clearSearch } = useContext(GlobalContext);
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);
    const refPagination = useRef({ page: 0, size: 12, isNoMoreArticle: false });

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const { page, size } = refPagination.current;
            const response = await fetch(`http://localhost:8080/api/v1/articles?page=${page}&size=${size}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                }
            });
            if (response.ok) {
                const result = await response.json();
                setArticles((prevArticles) => prevArticles ? [...prevArticles, ...result] : result);
                refPagination.current.page = page + 1;
                if (result?.length === 0) refPagination.current.isNoMoreArticle = true;
            }
          } catch (error) {
            console.log(error);
            return false;
          } finally {
            setLoading(false);
          }
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        if(isSearchLoading) setLoading(true);
        else setLoading(false);
        if(isSearchMode && !isSearchLoading) {
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
    }

  return (
    <div className='articles_container'>
        <Container maxWidth="xl">
            <div className='articles_container_toolbar'>
                <Typography textAlign='left' mb={4} variant="h5" component="h2">
                    {isSearchMode ? 'Search result: ' : 'Articles: '}
                </Typography>
                { isSearchMode && (
                    <Typography className='clear_search' textAlign='right' mb={4} variant="h6" component="h2" onClick={clearSearchHandler}>
                        {articles?.length > 0  ? 'Clear Search' : 'Reload All Articles'}
                    </Typography>
                )}
            </div>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                {articles?.length > 0 ? 
                    articles?.map((article) => <SingleArticle key={article?.id} article={article} />) : (
                    <Typography sx={{ width: '100%' }} textAlign='center' color='#777' mt={5} variant="h6" component="h2">
                        No article available!
                    </Typography>
                )}
            </Grid>
            {(!isSearchMode && !refPagination.current.isNoMoreArticle) && (<LoadingButton
                onClick={fetchArticles}
                loading={loading}
                loadingIndicator="Loading…"
                variant="outlined"
                sx={{ margin: 5 }}
                >
                <span>Load more</span>
            </LoadingButton>)}
        </Container>
    </div>
  )
}

export default Home