import { Match } from '../../Interfaces/LeagueClass/LeagueItem'
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';//Image 
type ItemsType = {
    matches: Match[];
}
const MatchBlock: React.FC<ItemsType> = ({ matches }) => {

    if (!matches || matches.length === 0) return <div></div>;

    return (
        <Container className="d-flex col-6 ">
            <Row>
                {matches.map((match, index) => (
                    <Col key={index} xs={12} md={12} lg={12} className="mb-3 ">
                        <div className="d-flex">
                            <Image
                                className="col-1"
                                src={match.team1Img}
                                alt="Logo ligi"
                                style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                                rounded
                            />
                            <p className="ms-2 col-4">{match.team1}</p>
                            <p className="ms-2 col-2">{match.result}</p>
                            <p className="ms-2 col-4">{match.team2}</p>
                            <Image
                                className="col-1"
                                src={match.team2Img}
                                alt="Logo ligi"
                                style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                                rounded
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default MatchBlock