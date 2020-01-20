import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import Blink from "../components/Blink";
import Profile from "../components/Profile";

export class home extends Component {
	state = {
		blinks: null
	};
	componentDidMount() {
		axios
			.get("/blinks")
			.then(res => {
				console.log(res.data);
				this.setState({
					blinks: res.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		let recentBlinksMarkup = this.state.blinks ? (
			this.state.blinks.map(blink => (
				<Blink key={blink.blinkId} blink={blink} />
			))
		) : (
			<p>Loading ...</p>
		);
		return (
			<Grid container spacing={6}>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
				<Grid item sm={8} xs={12}>
					{recentBlinksMarkup}
				</Grid>
			</Grid>
		);
	}
}

export default home;
