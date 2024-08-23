import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // URL-адрес API
    .setProject('66c85a9a00110b3cd2d9'); // Замените 'your_project_id' на реальный идентификатор проекта

export default client;
