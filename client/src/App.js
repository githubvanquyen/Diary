import { Col, Container, Row } from 'react-bootstrap';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddDiary from './components/AddDiary';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';
import ShowDiary from './components/ShowDiary';
function App() {
    // const client = new ApolloClient({
    //     uri: 'http://localhost:4000/graphql',
    //     cache: new InMemoryCache()
    // });
    return (
        <Container>
            <Row>
                <Col className="col-lg-6 col-sm-12 col-12">
                    <AddDiary />
                </Col>
                <Col className="col-lg-6 col-sm-12 col-12">
                    <AddTask />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="col-lg-6 col-sm-12 col-12">
                    <ShowDiary />
                </Col>
                <Col className="col-lg-6 col-sm-12 col-12">
                    <ShowTask />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
