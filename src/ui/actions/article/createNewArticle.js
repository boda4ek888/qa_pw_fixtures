import { test } from '@playwright/test';

export async function createNewArticle(createArticlePage,
                                       viewArticlePage, article) {
  await test.step(`Create an article`, async () => {

    await createArticlePage.open();
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    if (article.tags) {
      for (const tag of article.tags) {
        await createArticlePage.fillTagsField(tag);
      }
    }
    await createArticlePage.clickPublishArticleButton();

    await viewArticlePage.assertArticleTitleVisible(article.title);
    await viewArticlePage.assertArticleTextVisible(article.text);
  });
}
