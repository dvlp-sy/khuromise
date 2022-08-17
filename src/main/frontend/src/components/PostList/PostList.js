import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostListItem from "./PostListItem";
import useFetch from "../../hooks/useFetch";
import EmptyPage from "../EmptyPage";

const PostListBlock = styled.div`
  width: 100%;
  height: auto;
  margin: 20px auto;
  box-shadow: 0 0 8px 0 #bcbcbc;
  border-radius: 20px;
  max-width: 800px;
  min-width: 520px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostListHead = styled.div`
  width: 95%;
  height: 50px;
  border-bottom: 1px solid #bcbcbc;
  margin: 10px auto;
  padding-top: 5px;

  h1 {
    margin: 0;
    padding-left: 10px;
    font-size: 30px;
    font-weight: bold;
    line-height: 50px;
  }
`;

const PostListBody = styled.div`
  width: 95%;
  height: auto;
  margin: 5px auto;
`;

const PostList = (props) => {
  const { category } = useParams();
  const posts = useFetch(`http://localhost:3002/posts?category=${category}`);
  const { isLogin } = props;

  if (posts[0]) {
    if (posts[0].id === 0) {
      return null;
    }
  }

  return (
    <>
      {posts[0] ? (
        <PostListBlock>
          <PostListHead>
            <h1>{posts[0].category}</h1>
          </PostListHead>
          <PostListBody>
            {posts
              .sort((a, b) => b.id - a.id)
              .map((post) => (
                <PostListItem
                  key={post.id}
                  id={post.id}
                  category={post.category}
                  title={post.title}
                  date={post.date}
                  noon={post.noon}
                  hour={post.hour}
                  minute={post.minute}
                  placeName={post.placeName}
                  genderDisplay={post.genderDisplay}
                  currentPeople={post.currentPeople}
                  maxPeople={post.maxPeople}
                  writtenTime={post.writtenTime}
                  isLogin={isLogin}
                />
              ))}
          </PostListBody>
        </PostListBlock>
      ) : (
        <EmptyPage />
      )}
    </>
  );
};

export default PostList;
