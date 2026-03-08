// export const loadProspects = () => {
//     const data = localStorage.getItem("prospect_data");
//     return data ? JSON.parse(data) : [];
// };

// export const handleNewProspect = (prospect) => {
//     const {
//         name, 
//         age
//     } = prospect;

//     return {
//         id: crypto.randomUUID(),
//         name,
//         age,
//         quotes: []
//     };
// };

// export const saveNewProspect = (name, age) => {
//     const processedProspect = handleNewProspect({ name, age });

//     const existing = loadProspects();
//     localStorage.setItem(
//         "prospect_data",
//         JSON.stringify([
//             ...existing, 
//             processedProspect
//         ]),
//     );
// };