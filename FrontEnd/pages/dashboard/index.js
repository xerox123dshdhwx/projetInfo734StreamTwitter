import {PageWrapper} from "../../components/pageWrapper";
import axios from "axios";
import {useEffect, useState} from "react";
import {CustomPuffLoader} from "../../components/customPuffLoader";
import {createDataViz, wordCloud} from "../../dashboard/viz";
import ProtectedRoute from "../../components/protectedRoute";

const DashboardPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    const [tweets, setTweets] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect( () => {
        (async () => {
            if(!loaded){
                try{
                    let response = await axios.get("/api/account-tweets");
                    setTweets(response.data);
                }
                catch (e) {
                    showErrorMessage("Les tweets n'ont pas pu être récupérées", e.response.data);
                    setTweets(undefined);
                }
                setLoaded(true);
            }
        })();
    }, [loaded]);

    if (!loaded) {
        return <CustomPuffLoader/>
    }

    return (
        <PageWrapper>
            <h3>Nombre de tweets : {tweets.length}</h3>
            <h3>Répartition des langues</h3>
            <div id="langChart"></div>
            <div id="wordCloud"></div>
            {createDataViz(tweets)}
            {wordCloud(tweets)}
        </PageWrapper>
    );
}

export default ProtectedRoute(DashboardPage, false);