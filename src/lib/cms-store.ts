import { MongoClient, ObjectId } from "mongodb";
import { portfolioItems } from "@/content/portfolio";
import { siteProfile } from "@/content/site";
import type { PortfolioItem, SiteProfile, SiteSettings } from "@/lib/types";

export type CmsData = {
  profile: SiteProfile;
  settings: SiteSettings;
  works: PortfolioItem[];
};

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "portfolio_db";
const COLLECTION_NAME = "cms_data";

let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

function getDefaultData(): CmsData {
  return {
    profile: JSON.parse(JSON.stringify(siteProfile)) as SiteProfile,
    settings: {
      maintenanceMode: false,
    },
    works: JSON.parse(JSON.stringify(portfolioItems)) as PortfolioItem[],
  };
}

export async function getCmsData(): Promise<CmsData> {
  try {
    const client = await getMongoClient();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const data = await collection.findOne({});
    
    if (!data) {
      const defaultData = getDefaultData();
      await collection.insertOne({ ...defaultData, createdAt: new Date() });
      return defaultData;
    }

    return {
      profile: (data.profile ?? getDefaultData().profile) as SiteProfile,
      settings: {
        maintenanceMode: Boolean(data.settings?.maintenanceMode),
      },
      works: (data.works ?? getDefaultData().works) as PortfolioItem[],
    };
  } catch (error) {
    console.error("MongoDB error:", error);
    return getDefaultData();
  }
}

export async function saveCmsData(data: CmsData): Promise<void> {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  await collection.updateOne(
    {},
    { 
      $set: { 
        profile: data.profile,
        settings: data.settings,
        works: data.works,
        updatedAt: new Date()
      } 
    },
    { upsert: true }
  );
}
