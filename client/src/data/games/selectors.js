// export const getCurrentQuestionChoicesWithPercentage = (state) => {
//     const { choices } = state.questions.current || {};
//
//     if (!choices) return [];
//
//     const allVotes = choices.reduce((acc, choice) => acc + choice.votes, 0);
//
//     const choicesWithPercentage = choices.map((choice) => ({
//         ...choice,
//         percentage: allVotes !== 0 ? (100 * choice.votes / allVotes).toFixed(2) : '0',
//     }));
//
//     return choicesWithPercentage;
// }
