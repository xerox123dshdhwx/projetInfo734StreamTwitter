import {Columns, Heading} from "react-bulma-components";
import {PageWrapper} from "../../components/pageWrapper";
import {useEffect, useState} from "react";
import axios from "axios";
import {AccountsList} from "../../components/users/accountsList";

/**
 * La page pour visionner les utilisateurs "/users"
 * @param showSuccessMessage Fonction pour montrer un message de succès
 */
const AdminPage = ({showErrorMessage}) => {

    /**
     * Variable pour savoir si la donnée a été récupérée
     */
    const [loaded, setLoaded] = useState(false);

    /**
     * Les utilisateurs
     */
    const [accounts, setAccount] = useState([]);

    // On utilise un useEffet pour récupérer les comptes
    useEffect(() => {
        (async () => {

            // On veut faire la requête une seule fois
            if (!loaded) {

                // On essaye de faire la requête pour récupérer les comptes
                try {
                    const response = await axios.get(`/api/accounts`);

                    // On met à jour les utilisateurs
                    setAccount(response.data);
                    console.log(accounts)
                }

                    // Si on attrape une erreur alors on montre un message d'erreur
                catch (e) {
                    showErrorMessage("Il y a eu une erreur lors de la récupération des comptes", e.response.data);
                }

                // On dit que la donnée est mise à jour
                setLoaded(true);
            }
        })()
    }, [loaded]);

    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 tp-notification">
                <Columns>
                    <Columns.Column className="right">
                        <Heading className="is-3">Liste des utilisateurs</Heading>
                        <hr/>
                        <AccountsList accounts={accounts}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default AdminPage;