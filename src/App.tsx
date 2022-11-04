import { useState } from 'react';
import './App.scss';

const _formData = {
	jobTitle: '',
	description: '',
};

function App() {
	const [formData, setFormData] = useState(_formData);

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
							<button>Save</button>
						</div>
					</fieldset>
				</form>

				<div className="debuggingArea">
					<pre>{JSON.stringify(formData, null, 2)}</pre>
				</div>
			</section>
		</div>
	);
}

export default App;
