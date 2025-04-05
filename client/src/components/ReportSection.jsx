import { useState, useEffect } from 'react';

export const ReportSection = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/menu/report/');
        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }
        const data = await response.json();
        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e65f2b]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-red-700">Error loading report: {error}</p>
      </div>
    );
  }

  if (!report?.data?.length) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p>No analysis data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#F8F2EF] p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">AI-Generated Menu Analysis</h3>
        <ul className="space-y-4">
          {report.data.map((item) => (
            <li 
              key={item.id}
              className={`p-4 rounded-md ${
                item.text.includes('popular') 
                  ? 'bg-green-50 border-l-4 border-green-500'
                  : item.text.includes('unpopular')
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-gray-50 border-l-4 border-gray-300'
              }`}
            >
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-gray-700 mt-1">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-4">
          Report generated at: {new Date(report.generatedAt).toLocaleString()}
        </p>
      </div>

      <div className="bg-[#F8F2EF] p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Quick Recommendations</h3>
        <ul className="space-y-3">
          <li className="p-3 bg-blue-50 rounded-md">
            <strong>Most Popular:</strong> {
              report.data.find(i => i.text.includes('most popular'))?.title || 'N/A'
            }
          </li>
          <li className="p-3 bg-yellow-50 rounded-md">
            <strong>Stock Priority:</strong> Check inventory for high-demand items
          </li>
          <li className="p-3 bg-green-50 rounded-md">
            <strong>Next Review:</strong> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};