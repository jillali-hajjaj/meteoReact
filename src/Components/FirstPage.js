import React from 'react';
import {Alert, Button, Card, Col, Form, FormControl, ListGroup, Nav, Navbar} from "react-bootstrap";


export default class FirstPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            villeCherchee : 'Montpellier',
            tempActuelle : undefined,
            tempMax : undefined,
            tempMin : undefined,
            humidite: undefined,
            pression: undefined,
            vent : undefined,
            code : undefined,
            ville : undefined,
            icon : undefined
        }
    }

    componentDidMount() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.villeCherchee}&appid=7610c1faf81edbeddc533ead6a530912`)
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(d =>
                this.setState({
                    tempActuelle: d.main.temp,
                    tempMax: d.main.temp_max,
                    tempMin: d.main.temp_min,
                    humidite:d.main.humidity,
                    pression:d.main.pressure,
                    vent:d.wind.speed,
                    code:d.cod,
                    ville: d.name,
                    icon : d.weather[0].icon
                })
            )
            // Catch any errors we hit and update the app
            .catch(error => {
                this.setState({ code : 404 })
            });
    }

    handleChange = (event) => {
        this.setState({villeCherchee: event.target.value});
    };
    handleSubmit = (event) => {
        this.componentDidMount();
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">App Météo | React</Navbar.Brand>
                    <Nav className="mr-auto">
                        {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                    </Nav>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" value={this.state.villeCherchee} onChange={this.handleChange}/>
                        <Button variant="outline-info">Rechercher</Button>
                    </Form>
                </Navbar>
                {this.state.code !== 404 ?
                    <Col sm>
                    <div>
                        <Card bg="dark" className="cardBody" text="white" style={{ width: '25rem' }}>
                            <Card.Header > <span className="cardTitle">{this.state.ville}</span> <img src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`}/> </Card.Header>
                            <Card.Body>
                                <Card.Title>il fait : {Math.round(this.state.tempActuelle  - 273.15)} °C</Card.Title>
                                <ListGroup>
                                    <ListGroup.Item>Température Max. : {Math.round(this.state.tempMax - 273.15)} °C</ListGroup.Item>
                                    <ListGroup.Item>Température Min. : {Math.round(this.state.tempMin - 273.15)} °C</ListGroup.Item>
                                    <ListGroup.Item>Pression : {this.state.pression} hPa</ListGroup.Item>
                                    <ListGroup.Item>Vent : {this.state.vent} Km/H</ListGroup.Item>
                                    <ListGroup.Item>Humidité : {this.state.humidite} %</ListGroup.Item>
                                </ListGroup>

                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                    :
                    <Alert variant="warning" className="warningAlert" style={{ width: '25rem' }}>
                        <Alert.Heading>Ville non trouvée</Alert.Heading>
                        <p>
                            Veuillez entrer un nom de ville valide. Par exemple : Paris, Londres ...
                        </p>
                        <hr />
                        <p className="mb-0">
                            Si le problème persiste veuillez contacter l'administrateur.
                        </p>
                    </Alert>
                }


            </div>

        )
    }

}