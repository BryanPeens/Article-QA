// import React, { useRef } from 'react';

// const QuestionInput = ({ onQuestionSubmit }) => {
//   const questionRef = useRef(null);

//   const handleKeyPress = (e) => {
//     if (e.which === 13) {
//       const question = questionRef.current.value;
//       onQuestionSubmit(question);
//     }
//   };

//   return (
//     <div className="mt-4">
//       <label htmlFor="question" className="block text-lg font-medium text-gray-700">
//         Ask a Question
//       </label>
//       <input
//         id="question"
//         ref={questionRef}
//         className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//         onKeyPress={handleKeyPress}
//       />
//     </div>
//   );
// };

// export default QuestionInput;
