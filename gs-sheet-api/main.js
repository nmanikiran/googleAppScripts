(function() {
  'use strict';
  const API_URL =
    '<< Your Web App URL >>';

  async function init() {
    const $results = document.querySelector('.posts');
    const $btnSave = document.querySelector('.saver');
    const $postForm = document.querySelector('.post-form');
    const $loadPosts = document.querySelector('.reload');
    const $iTitle = document.querySelector('input[name="title"]');
    const $iDescription = document.querySelector(
      'textarea[name="description"]'
    );

    getPosts();

    $btnSave.addEventListener('click', savePost);
    $loadPosts.addEventListener('click', getPosts);
    $btnSave.addEventListener('submit', savePost, false);

    function savePost(e) {
      e.preventDefault();
      if (!($iTitle.value && $iDescription.value)) return;
      let arr = [$iTitle.value.trim(), $iDescription.value.trim()];
      let formData = new FormData();
      formData.append('data', JSON.stringify(arr));
      $postForm.style.display = 'none';
      save(formData);
    }

    async function save(formData) {
      try {
        let response = await fetch(API_URL, {
          method: 'POST',
          body: formData
        });
        let data = await response.json();
        $postForm.style.display = 'block';
        renderPost(data.post);
        restForm();
      } catch (error) {
        console.log(error);
        $postForm.style.display = 'block';
      }
    }

    async function getPosts() {
      $results.innerHTML = 'loading...';
      try {
        let response = await fetch(API_URL);
        let data = await response.json();
        if (data.status === 'success' || data.status === 200) {
          $results.innerHTML = '';
          data.posts.forEach(renderPost);
        }
      } catch (error) {
        console.log(error);
      }
    }

    //TODO:
    // async function deletePost(idx) {
    //   try {
    //     const response = await fetch(API_URL, { method: 'delete' });
    //     const data = await response.json();
    //     alert('item deleted');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    function renderPost(post) {
      let $name = document.createElement('h1');
      $name.innerHTML = post[1];
      let $message = document.createElement('p');
      $message.innerHTML = post[2];

      $results.appendChild($name);
      $results.appendChild($message);
      $results.appendChild(document.createElement('hr'));
    }

    function restForm() {
      $iTitle.value = '';
      $iDescription.value = '';
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
