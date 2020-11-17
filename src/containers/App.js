import { Component } from 'react';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import '../assets/css/App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: '',
		};
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }))
			.catch(error => {
				console.error(error);
			});
	}
	onSearchChange = e => {
		this.setState({ searchfield: e.target.value });
	};
	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		return !robots.length ? (
			<h1>Loading</h1>
		) : (
			<div className="tc">
				<h1 className="f1">RoboFriends</h1>
				<SearchBox search={this.onSearchChange} />
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots} />;
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default App;
