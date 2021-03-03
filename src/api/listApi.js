const listApi = {
  fetchTrending: (payload) => {
    return new Promise((resolve, reject) => {
      const { limit = 20, offset = 0 } = payload;
      fetch(
        `https://api.giphy.com/v1/gifs/trending?offset=${offset}&limit=${limit}&api_key=pmaUSY13ItOJTNzOidTSyfvVgypKD9kr&pingback_id=177f3a5b089b2f67`,
        {
          method: "GET",
        }
      ).then((data) => resolve(data.json()));
    });
  },
};

export default listApi;
