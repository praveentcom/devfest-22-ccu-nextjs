import { CheckCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AppStart: NextPage = () => {
	const [isApiCall, setIsApiCall] = useState<boolean>(false);
	const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);
	const [addressInput, setAddressInput] = useState<any>('');
	const [address, setAddress] = useState<any>('');
	const [eventName, setEventName] = useState<string>('');
	const [eventDate, setEventDate] = useState<Date>(new Date());
	const [apiResponse, setApiResponse] = useState<any>({});

	async function sendAgenda(event: React.SyntheticEvent) {
		event.preventDefault();
		if (!isApiCall) {
			setIsApiCall(true);
			const target = event.target as typeof event.target & {
				name: { value: string };
				date: { value: string };
			};
			setEventName(target.name.value);
			setEventDate(new Date(target.date.value));
			try {
				var response = await axios.post('/api/agendaRequest', {
					address: address,
				});
				if (response.status === 200) {
					setIsRequestSuccess(true);
					setApiResponse(response.data);
				}
			} catch {
			} finally {
				setIsApiCall(false);
			}
		}
	}

	function handleChange(address: any) {
		setAddressInput(address);
	}

	function handleSelect(address: any) {
		setAddress(address);
	}

	return (
		<div>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>DevFest Kolkata 2022</title>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon.png"></link>
				<link rel="shortcut icon" href="/favicon.png"></link>
				<meta name="theme-color" content="#000000"></meta>
			</Head>
			<main>
				<div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<h2 className="mt-4 text-2xl font-bold tracking-tight text-center text-gray-900">
							হ্যালো কলকাতা!
						</h2>
						<p className="mt-2 mb-4 text-sm text-center text-gray-600">
							Let&apos;s add an event with maps power
						</p>
					</div>

					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
						<div className="px-8 py-8 md:shadow sm:bg-white sm:rounded-lg sm:px-10">
							{isRequestSuccess ? (
								<div className="">
									<img
										src={apiResponse.picture}
										className="rounded-xl"
									/>
									<h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
										{eventName}
									</h2>
									<p className="mt-1 mb-4 text-sm text-gray-600">
										{eventDate.toDateString()}
									</p>
									<hr></hr>
									<img
										src={apiResponse.icon}
										className="w-6 h-6 my-4"
									/>
									<p className="my-2 text-sm text-gray-600">
										Location: {apiResponse.name}
									</p>
									<p className="my-2 text-sm text-gray-600">
										Address: {apiResponse.formatted_address}
									</p>
									<p className="my-2 mb-6 text-sm text-gray-600">
										Google Maps Rating: {apiResponse.rating}{' '}
										({apiResponse.user_ratings_total}{' '}
										ratings)
									</p>
									<p className="my-2 mt-6 text-sm text-gray-600">
										Maps Embed API
									</p>
									<iframe
										className="rounded-xl"
										width={'100%'}
										style={{ border: 0 }}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GMP_API_KEY}
                                            &q=${apiResponse.name}`}></iframe>
									<p className="my-2 mt-8 text-sm text-gray-600">
										Maps Static Image API
									</p>
									<img
										src={`https://maps.googleapis.com/maps/api/staticmap?size=512x256&zoom=15&center=${apiResponse.name}&key=${process.env.NEXT_PUBLIC_GMP_API_KEY}&map_id=b98792dfab037594`}
										className="rounded-xl"
									/>
								</div>
							) : (
								<form
									className="space-y-6"
									onSubmit={sendAgenda}
									action="#">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700">
											Event Name
										</label>
										<div className="mt-1">
											<input
												id="name"
												name="name"
												type="text"
												autoComplete="name"
												minLength={1}
												required
												className={`block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-blue-700 focus:outline-none focus:ring-blue-700 sm:text-sm`}
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="date"
											className="block text-sm font-medium text-gray-700">
											Event Date
										</label>
										<div className="mt-1">
											<input
												id="date"
												name="date"
												type="date"
												required
												className={`block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-blue-700 focus:outline-none focus:ring-blue-700 sm:text-sm`}
											/>
										</div>
									</div>
									<div>
										<div className="mt-1">
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-700">
												Search Event Location
											</label>
											<PlacesAutocomplete
												value={addressInput}
												onChange={handleChange}
												onSelect={handleSelect}>
												{({
													getInputProps,
													suggestions,
													getSuggestionItemProps,
													loading,
												}) => (
													<div>
														<input
															{...getInputProps({
																placeholder:
																	'Event Location',
															})}
															className={`block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-blue-700 focus:outline-none focus:ring-blue-700 sm:text-sm`}
														/>
														<div className="mt-2 autocomplete-dropdown-container ">
															{loading && (
																<div>
																	Loading...
																</div>
															)}
															{suggestions.map(
																(
																	suggestion
																) => {
																	const className =
																		suggestion.active
																			? 'suggestion-item--active my-4'
																			: 'suggestion-item my-4';
																	const style =
																		suggestion.active
																			? {
																					backgroundColor:
																						'#fafafa',
																					cursor: 'pointer',
																			  }
																			: {
																					cursor: 'pointer',
																			  };
																	return (
																		<div
																			{...getSuggestionItemProps(
																				suggestion,
																				{
																					className,
																					style,
																				}
																			)}
																			key={
																				suggestion.id
																			}>
																			<span
																				key={
																					'span' +
																					suggestion.id
																				}>
																				{
																					suggestion.description
																				}
																			</span>
																		</div>
																	);
																}
															)}
														</div>
													</div>
												)}
											</PlacesAutocomplete>
										</div>
									</div>
									{address && address.length > 0 ? (
										<>
											<div>
												<p className="text-gray-600 text-md">
													Selected Address - {address}
												</p>
											</div>
										</>
									) : (
										<></>
									)}

									<div>
										{!isApiCall ? (
											<button
												type="submit"
												className="flex justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none">
												Add event
											</button>
										) : (
											<button
												type="button"
												className="flex justify-center w-full px-4 py-2 mt-8 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm cursor-not-allowed focus:outline-none"
												disabled>
												<svg
													className="w-5 h-5 mr-3 animate-spin"
													viewBox="0 0 24 24">
													<circle
														className="opacity-25 fill-blue-700"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
												</svg>
												Please wait
											</button>
										)}
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AppStart;
