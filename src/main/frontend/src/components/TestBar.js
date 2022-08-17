import { Link } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

const TestBarBlock = styled.div`
  width: 100%;
  height: 50px;

  border-bottom: 1px solid #bcbcbc;

  display: flex;
  justify-content: center;
  align-items: center;

  li {
    margin-left: 10px;
  }
`;

const TestBar = () => {
  const categories = useFetch(`http://localhost:3002/categories`);

  const onClick = () => {
    window.location.reload();
  };

  return (
    <TestBarBlock>
      <li onClick={onClick}>
        <Link to="/">Home</Link>
      </li>
      {categories.map((category) => (
        <li onClick={onClick} key={category.id}>
          <Link to={`/${category.category}`}>{category.category}</Link>
        </li>
      ))}
    </TestBarBlock>
  );
};

export default TestBar;
