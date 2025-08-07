import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const SyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2.4rem 3.2rem 4rem;
  overflow: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-brand-600), var(--color-brand-500));
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: relative;
  z-index: 2;
`;

export default function AppLayout() {
  return (
    <SyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </SyledAppLayout>
  );
}
