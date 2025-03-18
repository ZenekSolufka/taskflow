import { FaTasks, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import SignIn from "./SignIn";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] font-sans">
      <section className="py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Manage your tasks{" "}
              <span className="text-[#00ADB5]">effectively</span>
            </h1>
            <p className="text-lg mb-8 text-[#EEEEEE]/80">
              TaskFlow is a modern tool for planning and tracking tasks, helping
              you stay organized and productive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SignIn />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#393E46] px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-[#00ADB5]">TaskFlow</span> Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#222831] p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-[#00ADB5] text-4xl mb-4">
                <FaTasks />
              </div>
              <h3 className="text-xl font-bold mb-2">Task Management</h3>
              <p className="text-[#EEEEEE]/80">
                Easily create, edit, and track your tasks. Organize them by
                categories and priorities.
              </p>
            </div>
            <div className="bg-[#222831] p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-[#00ADB5] text-4xl mb-4">
                <FaCalendarAlt />
              </div>
              <h3 className="text-xl font-bold mb-2">Calendar Integration</h3>
              <p className="text-[#EEEEEE]/80">
                Sync your tasks with Google Calendar and never miss an important
                deadline.
              </p>
            </div>
            <div className="bg-[#222831] p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-[#00ADB5] text-4xl mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-bold mb-2">Productivity Analysis</h3>
              <p className="text-[#EEEEEE]/80">
                Track your progress and analyze performance with clear charts
                and statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="flex flex-col items-center container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to boost your{" "}
            <span className="text-[#00ADB5]">productivity</span>?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-[#EEEEEE]/80">
            Join thousands of users who already use TaskFlow to effectively
            manage their time and tasks.
          </p>
          <SignIn />
        </div>
      </section>

      <footer className="bg-[#393E46] py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-[#00ADB5] text-xl font-bold">TaskFlow</span>
              <p className="text-sm text-[#EEEEEE]/70 mt-1">
                © 2025 TaskFlow. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors"
              >
                About us
              </a>
              <a
                href="#"
                className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-[#EEEEEE]/70 hover:text-[#00ADB5] transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
