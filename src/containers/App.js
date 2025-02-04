import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

class App extends Component {
	constructor(){
		super()
		this.state = {
			//robots: robots,
			robots: [],
			searchfield: ""
		}
	}

	componentDidMount() {
		console.log("App was loaded");

		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({robots: users}));
	}

	onSearchChange = (event) => {
		// console.log(event.target.value);
		this.setState({ searchfield: event.target.value});
	}

	render() {
		const { robots,searchfield } = this.state;

		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		//console.log(filteredRobots);

		return !robots.length ?
			<h1>loading the robots... </h1> :
			(
			<div className="tc">
				<h1 className="roboFont">robofriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
			);
	}
}

export default App;