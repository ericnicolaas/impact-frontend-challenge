import { useEffect, useState } from 'react';
import moment from 'moment';

import { Box, TextInput, Select } from "@primer/react"
import { SearchIcon } from '@primer/octicons-react';
import { Table } from './table';

import { TODAY, DATE_FORMAT } from '../utils/constants';

export const Container = () => {
	const [data, setData] = useState([]);
	// const [page, setPage] = useState(1);
	const page = 1;
	const [search, setSearch] = useState('');

	const [dates, setDates] = useState(['2019-01-01', TODAY])
	const yearsOptions = [ "All years", "Last 12 months", "2023", "2022", "2021", "2020", "2019" ];
	const handleYearChange = (option) => {
		switch (option) {
			case "Last 12 months":
				setDates([
					moment().subtract(365, 'days').format(DATE_FORMAT),
					TODAY
				])
				break;
			case "2023":
				setDates([
					"2023-01-01",
					TODAY
				])
				break;
			case "2022":
				setDates([
					"2022-01-01",
					"2022-12-31"
				])
				break;
			case "2021":
				setDates([
					"2021-01-01",
					"2021-12-31"
				])
				break;
			case "2020":
				setDates([
					"2020-01-01",
					"2020-12-31"
				])
				break;
			case "2019":
				setDates([
					"2019-01-01",
					"2019-12-31"
				])
				break;
			default:
				setDates([
					"2019-01-01",
					TODAY
				])
				break;
		}
	}


	const [location, setLocation] = useState('');
	const locationOptions = [
		"All locations",
		"Melbourne",
		"Sydney",
		"Adelaide",
		"Auckland"
	];
	const handleLocationChange = (option) => {
		if (option === "All locations") {
			setLocation("");
		} else {
			setLocation(option);
		}
	}

	const [provider, setProvider] = useState('');
	const providerOptions = [
		"All providers",
		"Amber",
		"Momentum",
		"Diamond",
		"Powershop",
		"Simply Energy",
		"Enova",
		"AGL"
	];
	const handleProviderChange = (option) => {
		if (option === "All providers") {
			setProvider("");
		} else {
			setProvider(option);
		}
	}

	useEffect(() => {
		const updateData = async () => {
			const response = await fetch(`https://impact-code-test.fly.dev/fetch-data?page=${page}&size=10&search=${search}&location=${location}&provider=${provider}&startDateFrom=${dates[0]}&startDateTo=${dates[1]}`)
			const jsonData = await response.json();
			setData(jsonData);
		}
		updateData()
			.catch(console.error);
	}, [page, search, dates, location, provider]);

	return (
		<Box sx={{
			borderStyle: 'solid',
			borderWidth: '1',
			borderColor: 'border.default',
			borderRadius: '1',
			width: 'large',
			maxWidth:'98%',
			margin: '100px auto',
			backgroundColor:'canvas.default',
		}}>
			<Box sx={{
				display: 'flex',
				padding: '2',
				gap: '2'
			}}
			>
				<TextInput
					leadingVisual={SearchIcon}
					aria-label="Search"
					name="search"
					placeholder="Search"
					onChange={(event) => {
						setSearch(event.target.value)
					}}
				/>
				<Select onChange={(event) => handleYearChange(event.target.value)}>
					{yearsOptions.map((year, index) => <Select.Option key={index} value={year}>{year}</Select.Option>)}
				</Select>
				<Select onChange={(event) => handleLocationChange(event.target.value)}>
					{locationOptions.map((location, index) => <Select.Option key={index} value={location}>{location}</Select.Option>)}
				</Select>
				<Select onChange={(event) => handleProviderChange(event.target.value)}>
					{providerOptions.map((provider, index) => <Select.Option key={index} value={provider}>{provider}</Select.Option>)}
				</Select>
			</Box>
			<Table data={data} />
		</Box>
	)
}