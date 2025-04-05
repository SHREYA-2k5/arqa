import { useState } from 'react';

export const ReportSection = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText(null);
    }
  };

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
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

  // Initialize text selection listener
  useState(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            <span className="text-orange-500">•</span> AI-Generated Menu Analysis
          </h3>
          {!report && (
            <button
              onClick={fetchReport}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                loading
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>Generate Today's Report</>
              )}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700 font-medium">Error loading report: {error}</p>
          </div>
        )}

        {!report && !loading && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg">
            <p className="text-blue-800 font-medium">No report generated yet. Click the button above to generate today's analysis.</p>
          </div>
        )}

        {loading && !report && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {report?.data?.length > 0 && (
          <>
            <ul className="space-y-4">
              {report.data.map((item) => (
                <li 
                  key={item.id}
                  className={`p-5 rounded-lg relative overflow-hidden transition-all duration-200 ${
                    item.text.includes('popular') 
                      ? 'bg-orange-50 border-l-4 border-orange-300 hover:bg-orange-100'
                      : item.text.includes('unpopular')
                        ? 'bg-blue-50 border-l-4 border-blue-300 hover:bg-blue-100'
                        : 'bg-gray-50 border-l-4 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-700">
                    {item.text.split(' ').map((word, i) => (
                      <span 
                        key={i}
                        className={`px-0.5 rounded-sm ${
                          selectedText && item.text.includes(selectedText) && 
                          word.includes(selectedText.split(' ')[0]) 
                            ? 'bg-yellow-200 text-gray-900' 
                            : ''
                        }`}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-orange-500">Report generated:</span> {new Date(report.generatedAt).toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>

      {report?.data?.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            <span className="text-orange-500">•</span> Quick Recommendations
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors border border-orange-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <strong className="text-gray-900">Most Popular</strong>
              </div>
              <p className="text-gray-700">
                {report.data.find(i => i.text.includes('most popular'))?.title || 'N/A'}
              </p>
            </li>
            <li className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors border border-orange-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <strong className="text-gray-900">Stock Priority</strong>
              </div>
              <p className="text-gray-700">Check inventory for high-demand items</p>
            </li>
            <li className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors border border-orange-100">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <strong className="text-gray-900">Next Review</strong>
              </div>
              <p className="text-gray-700">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};