import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

interface IDetails {
	remote: boolean;
	fullTime: boolean;
	largeCompany: boolean;
}

interface IJob {
	id: number;
	jobTitle: string;
	description: string;
	city: string;
	details: IDetails;
}

const _formData = {
	jobTitle: '',
	description: '',
	city: '',
	details: {
		remote: false,
		fullTime: false,
		largeCompany: false,
	},
};

const backendUrl = 'http://localhost:5557';

function App() {
	const [formData, setFormData] = useState(_formData);
	const [jobs, setJobs] = useState<IJob[]>([]);

	const getJobs = async () => {
		const response = await axios.get(`${backendUrl}/jobs`);
		const _jobs = response.data;
		setJobs(_jobs);
	};

	useEffect(() => {
		getJobs();
	}, []);

	const handleFieldChange = (e: any, fieldName: string) => {
		const value = e.target.value;
		const checked = e.target.checked;
		switch (fieldName) {
			case 'jobTitle':
				if (value === '/brr') {
					formData.jobTitle = 'React Developer';
					formData.city = 'berlin';
					formData.details.remote = true;
				} else {
					formData.jobTitle = value;
				}
				break;
			case 'description':
				formData.description = value;
				break;
			case 'city':
				formData.city = value;
				break;
			case 'remote':
				formData.details.remote = checked;
				break;
			case 'fullTime':
				formData.details.fullTime = checked;
				break;
			case 'largeCompany':
				formData.details.largeCompany = checked;
				break;
		}
		setFormData({ ...formData });
	};

	const handleSaveForm = (e: any) => {
		e.preventDefault();
		(async () => {
			const response = await axios.post(`${backendUrl}/jobs`, formData);
			getJobs();
			formData.jobTitle = '';
			formData.description = '';
		})();
	};

	const handleDeleteJob = (job: IJob) => {
		(async () => {
			const response = await axios.delete(`${backendUrl}/jobs/${job.id}`);
			getJobs();
		})();
	};

	return (
		<div className="App">
			<h1>Job Site</h1>

			<section>
				<form>
					<fieldset>
						<legend>New Job</legend>
						<div className="row">
							<label>Job Title</label>
							<div>
								<input
									value={formData.jobTitle}
									onChange={(e) =>
										handleFieldChange(e, 'jobTitle')
									}
									type="text"
								/>
							</div>
						</div>

						<div className="row">
							<label>Description</label>
							<div>
								<textarea
									value={formData.description}
									spellCheck="false"
									onChange={(e) =>
										handleFieldChange(e, 'description')
									}
								/>
							</div>
						</div>

						<div className="row">
							<label>City</label>
							<div>
								<select
									value={formData.city}
									onChange={(e) =>
										handleFieldChange(e, 'city')
									}
								>
									<option value="">(please choose)</option>
									<option value="hamburg">Hamburg</option>
									<option value="berlin">Berlin</option>
									<option value="dresden">Dresden</option>
									<option value="leipzig">Leipzig</option>
								</select>
							</div>
						</div>

						<div className="row">
							<label>Details</label>
							<div>
								<div>
									<input
										type="checkbox"
										onChange={(e) =>
											handleFieldChange(e, 'remote')
										}
										checked={formData.details.remote}
									/>{' '}
									remote
								</div>
								<div>
									<input
										type="checkbox"
										onChange={(e) =>
											handleFieldChange(e, 'fullTime')
										}
										checked={formData.details.fullTime}
									/>{' '}
									full-time
								</div>
								<div>
									<input
										type="checkbox"
										onChange={(e) =>
											handleFieldChange(e, 'largeCompany')
										}
										checked={formData.details.largeCompany}
									/>{' '}
									large company
								</div>
							</div>
						</div>

						<div className="buttonRow">
							<button onClick={(e) => handleSaveForm(e)}>
								Save
							</button>
						</div>
					</fieldset>
				</form>

				<div className="currentJobs">
					<h2>There are {jobs.length} jobs:</h2>
					{jobs.map((job) => {
						return (
							<div className="job" key={job.id}>
								<div className="title">
									{job.jobTitle} (
									<span
										onClick={() => handleDeleteJob(job)}
										className="delete"
									>
										delete
									</span>
									)
								</div>
							</div>
						);
					})}
				</div>

				<div className="debuggingArea">
					<pre>{JSON.stringify(formData, null, 2)}</pre>
				</div>
			</section>
		</div>
	);
}

export default App;
