import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: auto;
  
  svg {
    color: var( --red);
    width: 6rem;
    height: 6rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    color: var( --red);
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h5 {
    color: var(--text-title);
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const Button = styled.div`
  width: 100%;
  display: flex;
  flex: 1;

  button {
    width: 100%;
    padding: 0 1.5rem;
    height: 3rem;
    background: var(--red);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin: 0 1rem 0 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
  }

  &:first-child {
    background: var(--text-body);
  }
}
`;