import moment from 'moment';
import { Box, Checkbox } from "@primer/react"

import './table.css';

const currencyFormatter = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' });

export const TableRow = ({rowData, id}) => {
	return (
		<tr>
			<td><Checkbox id={"check-" + id} /></td>
			<td>{rowData.location}</td>
			<td>NMI {rowData.meterId}</td>
			<td>{moment(rowData.startDate).format("D MMM, YYYY")}</td>
			<td>{rowData.endDate}</td>
			<td>{rowData.provider}</td>
			<td>{rowData.usageKwh} kWh</td>
			<td>{rowData.greenPower}%</td>
			<td>{currencyFormatter.format(rowData.amountPaid)}</td>
			<td>{rowData.emissions} tCO2e</td>
		</tr>
	)
}

export const Table = ({data}) => {
	return (
		<Box as="table">
			<thead>
				<tr>
					<th><Checkbox id="check-all" /></th>
					<th>Location</th>
					<th>Meter ID</th>
					<th>Start date</th>
					<th>End date</th>
					<th>Provider</th>
					<th>Usage</th>
					<th>GreenPower %</th>
					<th>Amount</th>
					<th>Emissions</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => {
					return <TableRow rowData={row} id={index} key={index} />;
				})}
			</tbody>
		</Box>
	)
}