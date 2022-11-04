import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

interface IJob {
	id: number;
	jobTitle: string;
	description: string;
}

const _formData = {
	jobTitle: '',
	description: '',
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

		switch (fieldName) {
			case 'jobTitle':
				formData.jobTitle = value;
				break;
			case 'description':
				formData.description = value;
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
