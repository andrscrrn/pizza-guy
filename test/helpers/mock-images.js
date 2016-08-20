import nock from 'nock';
import path from 'path';

/**
 * Mock a set of images in a mocked server.
 * @param {String} baseUrl
 * @param {String[]} images
 * @return {Nock} Nock instance.
 */
export function mockImages(baseUrl, images) {
  return images.reduce(function addImageToServer(server, image) {
    const { base } = path.parse(image);

    return server
      .get(`/${base}`)
      .replyWithFile(200, path.join(process.cwd(), image), { 'content-type': 'image/jpg' });
  }, nock(baseUrl));
}
