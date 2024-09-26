import { Meilisearch } from 'meilisearch';
import config from '../config';
import { noImage } from '../modules/Item/item.constant';
import { TItem } from '../modules/Item/item.interface';

const meiliClient = new Meilisearch({
  host: config.meilisearch_host as string,
  apiKey: config.meilisearch_master_key,
});

export { meiliClient };

export async function addDocumentToIndex(result: TItem, indexKey: string) {
  const index = meiliClient.index(indexKey);

  const { _id, title, description, images } = result;
  const firstImage = images?.[0] || noImage;

  const document = {
    id: _id?.toString(),
    title,
    description,
    thumbnail: firstImage,
  };

  try {
    await index.addDocuments([document]);
  } catch (error) {
    console.error('Error adding document to MeiliSearch:', error);
  }
}

export async function deleteDocumentFromIndex(indexKey: string, id: string) {
  const index = meiliClient.index(indexKey);

  try {
    await index.deleteDocument(id);
  } catch (error) {
    console.error('Error deleting resource from MeiliSearch:', error);
  }
}
