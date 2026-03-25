import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { faker } from '@faker-js/faker';
import {
  BODY_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TITLE_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';



test.beforeEach(async ({ page, user}) => {
  await signUpUser(page, user);
});

test('Edit the article title for the article', async (
  { page, viewArticlePage,
    editArticlePage, articleWithoutTags  }) => {
  await createNewArticle(page, articleWithoutTags);

  const title = faker.lorem.words()

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField(title);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTitleVisible(title);
});

test('Edit the article description for the article', async (
  { page, viewArticlePage,
    editArticlePage, profilePage, articleWithoutTags  }) => {
  await createNewArticle(page, articleWithoutTags);

  const description = faker.lorem.sentence(4);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillDescriptionField(description);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();
  await profilePage.clickProfileLink();

  await profilePage.assertArticleDescriptionVisible(description);
});

test('Edit the article text for the article', async (
  { page, viewArticlePage,
    editArticlePage, articleWithoutTags  }) => {
  await createNewArticle(page, articleWithoutTags);

  const text = faker.lorem.sentences(2);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTextField(text);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTextVisible(text);
});

test('Add the tag for the article without tags', async (
  { page, viewArticlePage,
    editArticlePage, articleWithoutTags  }) => {
  await createNewArticle(page, articleWithoutTags);

  const tag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(tag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTagVisible(tag);
});

test('Add the tag for the article with tags', async (
  { page, viewArticlePage,
    editArticlePage, articleWithTwoTags  }) => {
  await createNewArticle(page, articleWithTwoTags);

  const tag = faker.lorem.word();

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(tag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTagVisible(tag);
});

test('Remove an article tag for the article with tag', async (
  { page, viewArticlePage,
    editArticlePage, articleWithOneTag  }) => {
  await createNewArticle(page, articleWithOneTag);

  const tagText = articleWithOneTag.tags[0];

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.removeArticleTag(tagText);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePage();
  await viewArticlePage.refreshPage();

  await viewArticlePage.assertArticleTagNotVisible();
});

test('Remove an article title for the article', async (
  { page, viewArticlePage,
    editArticlePage, articleWithoutTags  }) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the article', async (
  { page, viewArticlePage,
    editArticlePage, articleWithoutTags  }) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillDescriptionField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Remove the article text for the existing article', async (
  { page, viewArticlePage,
    editArticlePage, articleWithoutTags  }) => {
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTextField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
