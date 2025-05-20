import { League } from '../../Interfaces/LeagueClass/LeagueItem'
import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import MatchBlock from'./MatchBlock.tsx'

type ItemsType = {
    leagues: League[];
}
const LeagueBlock: React.FC<ItemsType> = ({ leagues }) => {
    if (!leagues || leagues.length === 0) return <div></div>;

    const [openArray, setOpenArray] = useState(Array(leagues.length).fill(true));
    const toggleItem = (index: number) => {
        console.log(openArray[index]);
        setOpenArray(prev =>
            prev.map((item, i) => (i === index ? !item : item))
        );
    };

    

    return (
        <Container className="d-flex align-items-center col-6 align-self-center">
            <Row>
                {leagues.map((league,index) => (
                    <Col key={index} xs={12} md={12} lg={12} className="mb-3 align-items-center ">
                        <div className="d-flex bd-highlight align-items-center bg-body-secondary">
                            <Image
                                className="bd-highlight"
                                src={league.leagueImg}
                                alt="Logo ligi"
                                style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                                rounded
                            />
                            <label className="ms-2 bd-highlight">League:</label>
                            <label className="ms-2 bd-highlight">{league.leagueName}</label>
                            <Button
                                onClick={() => toggleItem(index)}
                                aria-controls="example-collapse-addPlayer"
                                aria-expanded={openArray[index]}
                                className="ms-auto rounded-circle d-flex align-items-center justify-content-center p-0"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    fontSize: '16px',
                                    lineHeight: '1',
                                    backgroundColor: '#d3d3d3', 
                                    border: 'none',
                                    color: '#000',
                                }}
                            >
                                {openArray[index] ? '-' : '+'}
                            </Button>
                        </div>
                         {openArray[index] ?
                        (<div className="d-flex">
                                <MatchBlock matches={league.matches} />
                            </div>) : null
                        }
                        
    
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default LeagueBlock