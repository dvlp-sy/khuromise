import useFetch from '../hooks/useFetch';

function useCurrentId(url) {
  const fetchs = useFetch(url);
  const posts = [...fetchs]
  const idList = posts.map((post) => post.id)
  const id = Math.max(...idList);
  return id;
}

export default useCurrentId;