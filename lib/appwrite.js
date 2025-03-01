import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.company.appname',
    projectId: '67c068f700032ee54915',
    databaseId: '67c06a88002cb6cdd731',
    userCollectionId: '67c06ba50002b9e40217',
    videoCollectionId: '67c06bd9000049be8f59',
    storageId: '67c06e1600032d486cf3',
}


// init your react-native sdk
const client = new Client();

client
    .setEndpoint(config.endpoint) // project endpoint
    .setProject(config.projectId) //your project id
    .setPlatform(config.platform) //app id or platform id

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    export const createUser = async (email, username, password) => {
        // register user
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            username,
            password
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    }


    export const signIn = async (email, password) => {
        try {
            const session = await account.createEmailPasswordSession(
                email,
                password
            )

            return session;

        } catch (error) {
            throw new Error(error);
        }
    } 
    

    export const getCurrentUser = async () => {
        try {
            const currentAccount = await account.get();

            if (!currentAccount) throw Error;

            const currentUser = await databases.listDocuments(
                config.databaseId,
                config.userCollectionId,
                [Query.equal('accountId', currentAccount.$id)]
            )

            if (!currentUser) throw Error;

            return currentUser.documents[0];
        } catch (error) {
            console.log(error)
        }
    }