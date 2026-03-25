import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

type ArticleFixtures = {
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  profilePage: ProfilePage;
  articleWithoutTags: any;
  articleWithOneTag: any;
  articleWithTwoTags: any;
};

export const test = base.extend<ArticleFixtures>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);
    await use(createArticlePage);
  },

  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);
    await use(viewArticlePage);
  },

  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);
    await use(editArticlePage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  articleWithoutTags: async ({ logger }, use) => {
    const articleWithoutTags = generateNewArticleData(logger);
    await use(articleWithoutTags);
  },

  articleWithOneTag: async ({ logger }, use) => {
    const articleWithOneTag = generateNewArticleData(logger, 1);
    await use(articleWithOneTag);
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const articleWithTwoTags = generateNewArticleData(logger, 2);

    await use(articleWithTwoTags);
  },
});
