import { title } from "@/components/primitives";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className=" p-8">
      <div className="mt-4">
        {/* about */}
        <>
          <section className="m-4 md:m-8 shadow-md">
            <div className="container p-4 mx-auto my-6 space-y-1 text-center">
              <span className="text-xs font-semibold tracki uppercase text-rose-600">
                About
              </span>
              <h2 className="pb-3 text-3xl font-bold md:text-4xl">
                ESP32 Energy Monitor
              </h2>
              <p>
                Welcome to the ESP32 Energy Monitor, Link platform designed to
                monitor and visualize energy data collected from ESP32 devices.
                Our system provides real-time insights into voltage, current,
                power, and energy consumption, helping you keep track of your
                electrical usage.
              </p>
            </div>
            <div className="container grid justify-center gap-4 mx-auto lg:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col px-8 py-6 lg:border-none xl:border-solid">
                <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font ">
                  Historical Data Review
                </h2>
                <p className="flex-1 mb-4 text-base leading-relaxed text-gray-600">
                  historical energy data to identify trends, patterns, and
                  potential areas for optimization.
                </p>
                <Link
                  className="inline-flex items-center space-x-2 text-sm text-rose-600"
                  href="/history"
                >
                  <span>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="flex flex-col px-8 py-6">
                <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font ">
                  Real-time Monitoring
                </h2>
                <p className="flex-1 mb-4 text-base leading-relaxed text-gray-600">
                  Get live updates on voltage, current, power, and energy
                  consumption from your ESP32 devices.
                </p>
                <Link
                  className="inline-flex items-center space-x-2 text-sm text-rose-600"
                  href="/monitor"
                >
                  <span>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>{" "}
              <div className="flex flex-col px-8 py-6">
                <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font ">
                  AI-powered Suggestions
                </h2>
                <p className="flex-1 mb-4 text-base leading-relaxed text-gray-600">
                  Explore AI-generated suggestions based on your energy data.
                </p>
                <Link
                  className="inline-flex items-center space-x-2 text-sm text-rose-600"
                  href="/monitor"
                >
                  <span>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </>
        {/* about */}

        {/* working */}
        <>
          <section className="shadow-md text-gray-800">
            <div className="container max-w-xl p-6 py-12 mx-auto space-y-16 lg:px-8 lg:max-w-7xl">
              <div>
                <h2 className="text-2xl font-bold tracki text-center sm:text-2xl ">
                  How it works
                </h2>
                
              </div>
              <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h3 className="text-2xl font-bold tracki sm:text-2xl ">
                    ESP32 and Sensors
                  </h3>
                  <p className="mt-3 text-lg text-gray-600">
                    Install and configure ESP32 and other sensors to measure voltage,
                    current, and power
                  </p>
                  <div className="mt-12 space-y-12">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-rose-600 text-gray-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium leading-relaxed ">
                          Data Transmission
                        </h4>
                        <p className="mt-2 text-gray-600">
                          ESP32 devices send energy data to our platform via the
                          Internet.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-rose-600 text-gray-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium leading-relaxed ">
                          Real-time Visualization
                        </h4>
                        <p className="mt-2 text-gray-600">
                          View real-time graphs and charts on the dashboard to
                          monitor energy metrics.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-rose-600 text-gray-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium leading-relaxed ">
                          Historical Analysis
                        </h4>
                        <p className="mt-2 text-gray-600">
                          Dive into historical data to gain Link deeper
                          understanding of your energy consumption patterns.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-rose-600 text-gray-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium leading-relaxed ">
                          AI Insights
                        </h4>
                        <p className="mt-2 text-gray-600">
                          Generate AI-powered suggestions to optimize energy
                          usage and reduce environmental impact.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="mt-10 lg:mt-0">
                  <Image
                    src="https://source.unsplash.com/random/360x480?energy,electricity"
                    alt=""
                    className="mx-auto rounded-lg shadow-lg bg-gray-500"
					height={400}
					width={400}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
        {/* working */}
      </div>
    </div>
  );
}
