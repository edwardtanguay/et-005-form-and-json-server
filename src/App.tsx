import { useState } from 'react';
import './App.scss';

const _formData = {
	jobTitle: '',
	description: '',
};

function App() {
	const [formData, setFormData] = useState(_formData);

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
								<input type="text" />
							</div>
						</div>

						<div className="row">
							<label>Description</label>
							<div>
								<textarea />
							</div>
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
