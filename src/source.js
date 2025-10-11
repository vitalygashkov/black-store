export class Source {
  constructor(url) {
    this.url = url;
    this.adapter = (post) => post;
  }

  with(transformPost) {
    this.adapter = transformPost;
    return this;
  }

  async fetchPosts() {
    throw new Error('Not implemented');
  }
}
