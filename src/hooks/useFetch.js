export async function useFetch({ url, method = "GET", body }) {
  const request = {
    method,
  };

  if (body) {
    request.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, request);

    if (res.status === 404) {
      throw Error();
    }

    return res.json();
  } catch (e) {
    throw e;
  }
}
