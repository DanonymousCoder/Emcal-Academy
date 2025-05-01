const subjectSelection = document.getElementById('subject-selection');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results');
const questionArea = document.getElementById('question-area');
const answerOptions = document.getElementById('answer-options');
const nextQuestionButton = document.getElementById('next-question');
const scoreDisplay = document.getElementById('score');
const tryAgainButton = document.getElementById('try-again');
const previousQuestionButton = document.getElementById('previous-question');
let currentSubject = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Sample Quiz Data (Replace with your own data)
const mathQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const EnglishQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const PhyQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const ChemQuestions = [
    { question: "1. Which of the following pairs of species contains the same number of electrons? [₆C, ₈O, ₁₀Ne, ₁₁Na, ₁₂Mg, ₁₃Al, ₁₇Cl] ", options: ["Mg²⁺ and Al³⁺ ", "Cl⁻ and Ne ",  "Na⁺ and Mg ", "C and O²⁻"],  correct: 1 },
    { question: "2. How many orbitals are in the d-subshell? ", options: ["1","2","5","7"], correct: 1 },
    { question: "3. An element with atomic mass number 133 and atomic number 55 has:", options: ["55 electrons and 55 neutrons ","55 electrons and 78 neutrons ","78 electrons and 78 neutrons ","78 electrons and 55 neutrons"], correct: 1 },
    { question: "4. Which of the following electronic configurations represent that of a noble gas? ", options: ["2,8,8,2 ","2,8,2 ","2,8 ","2,6"], correct: 1 },
    { question:"5. Diamond is hard because its carbon atoms are held by ", options: ["Delocalized electrons ","Strong electrostatic forces","Van der Waals forces ","Strong directional covalent body"], correct: 1 },
    { question: "6. An element X has isotopic masses of 6 and 7. If the relative abundance is 1 to 12.5 respectively. What is the relative atomic mass of X? ", options: [" 6.0 ","6.1","6.9","7.0"], correct: 1 },
    { question: "7. An element X has electronic configuration1s²2s²2p⁶ 3S²3p⁶4S². To which group of the periodic table does X belong?", options: ["I","II","III","IV"], correct: 1 },
    { question: "8. Which of the following set of elements is arranged in order of increasing first ionization energies? ",options: ["₁₁Na, ₃Li, ₁₉K, ₃₇Rb","₃₇Rb, ₁₉K, ₃Li, ₁₁Na","₃Li, ₁₉K, ₁₁Na, ₃₇Rb ","₃₇Rb, ₁₉K, ₁₁Na, ₃Li"], correct: 1 },
    { question: "9. The presence of unpaired electrons in an atom of a d-block element accounts for its:", options: ["ductility ","lustre","malleability","paramagnetism"], correct: 1 },
    { question: "10. According to the kinetic theory, an increase in temperature causes the kinetic energy of the particles to", options: [" Decrease"," Increase","Remain constant","Zero"], correct: 1 },
    { question: "11. Elements which belong to the same group in the periodic are characterized by:", options: ["Difference of +1 in the oxidation numbers of successive numbers","Presence of the same number of outmost electrons in the respective atoms"," Difference of 14 atomic mass units between successive members","Presence of the same number of electron shells in the respective atoms"], correct: 1 },
    { question: "12. If 1 mole of sodium contains 6.02 x 10²³ atoms, how many atoms are contained in 0.6g of sodium[Na = 23]", options: ["1.56 x 10²³","1.56 x 10²²","3.6 x 10²³","3.6 x 10²²"], correct: 1 },
    { question: "13. If 20cm³ of distilled water is added to 80cm³ of 0.5moldm⁻³ hydrochloric acid, the new concentration of the acid will be", options: ["0.10moldm⁻³","0.20moldm⁻³","0.40moldm⁻³","2.00moldm⁻³"], correct: 1 },
    { question: "14. Consider the reaction represented by the equation: 2NaHCO₃(s) -------> 2Na₂CO₃(s) + CO₂ (g) + H₂O (g). What volume of carbon (iv) oxide at s.t.p is evolved when 0.5mole of NaHCO₃ is heated? [Molar Volume = 22.4dm³ at s.t.p] ", options: ["1.12dm³","2.24dm³","5.6dm³","56.0dm³"], correct: 1 },
    { question: "15. Which of the following processes is an endothermic reaction?", options: ["Dissolving NH₄Cl crystals in water","Addition of concentrated H₂SO₄ to water","Dissolving NaOH pellets in water","Passing SO₃ gas into water"], correct: 1 },
    { question: "16. The indicator used in neutralizing CH₃COOH and NaOH solutions has pH range of", options: ["3 - 5","7 - 8","8 - 10","10 - 12"], correct: 1 },
    { question: "17. When aqueous ammonia is added to one of the following solutions, a white precipitate which dissolves in excess ammonia is formed. Identify the solution", options: ["ZnCl₂","Pb(NO₃)₂","CuSO₄","FeSO₄"], correct: 1 },
    { question: "18. Consider the reaction represented by the equation: 2SO₂(g) + O₂ (g) ⥦ 2SO₃(g); ΔH = -197KJmol⁻¹. Which of the following conditions will not increase the yield of sulphur (iv) oxide?", options: ["Increase in temperature","Decrease in temperature","Increase in pressure","Addition of O₂ into the mixture"], correct: 1 },
    { question: "19. Metals can be extracted from their ores by a process involving", options: [" Reduction","Oxidation"," Hydrolysis"," Decomposition"], correct: 1 },
    { question: "20. The oxidation number of iodine in the iodate ion (IO₃⁻) is", options: ["-5","-1","+1","+5"], correct: 1 },
    { question: "21. Electrolysis is applied in the following processes except", options: ["Electroplating","Extraction of aluminium ","Extraction of iron ","Purification of copper"], correct: 1 },
    { question: "22. Which of the following compounds absorbs moisture from the atmosphere and dissolves in it?", options: ["FeCl₃","MgSO₄.7H₂O","Na₂SO₄"," KCl"], correct: 1 },
    { question: "23. When 50cm³ of a saturated solution of KNO₃ at 25⁰c was evaporated to dryness, 10g of dry salt was obtained. What is the solubility of KNO₃ at 25⁰c? [KNO₃ = 101] ", options: ["0.10moldm⁻³","2.0moldm⁻³","5.0moldm⁻³","10.0moldm⁻³"], correct: 1 },
    { question: "24. Which of the following gases will have the lowest rate of diffusion under the same conditions? [N = 14, 0 = 16, Cl = 35.5, Ar = 40]", options: ["Argon"," Chlorine","Nitrogen","Oxygen"], correct: 1 },
    { question: "25. Consider the reaction: H⁺(aq) + OH⁻(aq) ------> H₂O (l). The energy change taking place in the reaction above is enthalpy of ", options: ["Formation","Hydration","Neutralization"," Solution"], correct: 1 },
    { question: "26. Consider the reaction: 2Al(s) + 6H⁺(aq) -----> Al³⁺(aq) + 3H₂(g). What is the total number of moles of electrons transferred from the aluminium atoms to the hydrogen ions?", options: ["3","4","5","6"], correct: 1 },
    { question: "27. In the reaction represented by the equation: 5Fe²⁺(aq) + MnO₄⁻ (aq) + 8H⁺(aq) -----> 5Fe³⁺(aq) + Mn²⁺(aq) + 4H₂O(l). Which species is reduced?", options: ["Fe²⁺ ","MnO₄⁻ ","H⁺ ","Fe³⁺"], correct: 1 },
    { question: "28. What type of bonding is involved in the formation of NH₄⁺ from a molecule of ammonia and a proton?", options: ["Covalent Bonding","Co-ordinate Covalent Bonding","Electrovalent Bonding","Hydrogen Bonding"], correct: 1 },
    { question: "29. Consider the equation for the equilibrium reaction: N₂ (g) + 3H₂ (g) ⥦ 2NH₃ (g); ΔH = -92KJmol⁻¹. The equilibrium constant for the reaction can be expressed as:", options: ["K_c   = (2[NH₃])/(3[H₂][N₂] )","K_c  =  [NH^3 ]^2/([N^2 ] [H^2 ]^3 )","K_c  = (3[H₂][N₂])/(2[NH₃])","K_c   = ( [N₂][H₂]³)/([NH₃]²)"], correct: 1 },
    { question: "30. The ammonium compound user in the manufacture of dry cells is", options: ["NH₄NO₃","NH₄NO₃","NH₄NO₃","(NH₄)₂CO₃"], correct: 1 },
    { question: "31. Which of the following substances is an ore of iron? ", options: ["Bauxite","Cassiterite","Hematite","Steel"], correct: 1 },
    { question: "32. What type of reaction occurs between vegetable oil and plant ash extract?", options: ["Displacement","Dehydration","Neutralization","Saponification"], correct: 1 },
    { question: "33. Which of the following compounds is an alkanoate?", options: ["CH₃COOH","CH₃COOCH₃","CH₃CH₂OH","CH₃CH₂COOH"], correct: 1 },
    { question: "34. Greenhouse effect can be reduced by controlling", options: ["Water evaporation","Burning of wood and fossil fuel","The use of aerosols","The use of artificial fertilizers"], correct: 1 },
    { question: "35. What is C_x H_yin the following equation? C_x H_y + 5O₂ -----> 3CO₂ + 4H₂O", options: [" C₃H₄","C₃H₆","C₃H₈","C₅H₁₀"], correct: 1 },
    { question: "36. If the difference between the electronegativity of two elements is large, the type of bond that can be formed between them is", options: ["Covalent"," Dative","Ionic","Metallic"], correct: 1 },
    { question: "37. What is the percentage composition of oxygen in K₂Cr₂O₇? [K₂Cr₂O₇ = 294, O = 16, K = 39, Cr = 52]", options: ["14.50%","26.53%","35.67%","38.09%"], correct: 1 },
    { question: "38. Which of the following gases is lighter than air?", options: ["CO₂","SO₂","HCl","NH₃"], correct: 1 },
    { question: "39. Which of the following statements is true of the molecules of a gas under ideal conditions? The molecules", options: ["Move at random","Undergo inelastic collisions","Attract each other","Occupy a large volume"], correct: 1 },
    { question: "40. 14.8g of a salt Z dissolved in 250cm³ of distilled water to give a concentration of 0.80moldm⁻³. Calculate the molar mass of salt Z.", options: ["13.5gmol⁻¹","18.5gmol⁻¹","47.4gmol⁻¹","74.0gmol⁻¹"], correct: 1 },
    { question: "41. What is the oxidation number of Chromium in K₂Cr₂O₇?", options: ["+1","+2","+4","+6"], correct: 1 },
    { question: "42. What is the empirical formula of a hydrocarbon containing 0.08moles of carbon and 0.32moles of hydrogen?", options: ["CH₂","CH₃","CH₄","C₂H₄"], correct: 1 },
    { question: "43. 25cm³ of 0.80moldm⁻³ hydrochloric acid neutralized 20cm³ of sodium hydroxide solution. What is the concentration of sodium hydroxide in moldm⁻³? NaOH(aq) + HCl(aq) ------> NaCl(aq) + H₂O(l)", options: ["0.08","0.10","0.80","1.00"], correct: 1 },
    { question: "44. Which of the following expressions correctly represents Charles' law?", options: ["PV = K"," R ∞ 1/√P","PV = RT","V = KT"], correct: 1 },
    { question: "45. Which of the following dilute acids does not react with metals to liberate hydrogen?", options: ["CH₃COOH","HCl","H₂SO₄","HNO₃"], correct: 1 },
    { question: "46. The product of the reaction between C₂H₅OH and concentrated H₂SO₄ at 170⁰c is", options: ["(C₂H₅)₂SO₄","(C₂H₅)₂SO₄","(C₂H₅)O","CH₂ ≡ CH₂"], correct: 1 },
    { question: "47. Ethanol reacts with excess acidified K₂Cr₂O₇ to produce", options: ["Ethanal ","Ethane","Ethanoic acid","Ethyl ethanoate"], correct: 1 },
    { question: "48. A consequence of global warming is", options: ["Air Pollution","Flooding"," Increased humidity","low rainfall"], correct: 1 },
    { question: "49. The major product in the solvay process is", options: ["NaOH","Na₂CO₃","NH₃","H₂SO₄"], correct: 1 },
    { question: "50. When Bromine is added to ethene at room temperature, the compound formed is", options: ["1,1 - dibromoethane","1,1 - dibromoethene","1,2 - dibromoethane","1,2 - dibromoethene"], correct: 1 },
];

const BioQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const civicQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const FurQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const AccQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const CRSQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const AgricQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const tecQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const EconQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const ArtQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const LitQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const GovQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const CommerQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const HistQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];
const FOODQuestions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    // Add more math questions
];


const historyQuestions = [
    { question: "When did World War II begin?", options: ["1914", "1939", "1941", "1945"], correct: 1 },
    // Add more history questions
];

// Function to display the question and options
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionArea.textContent = question.question;
    answerOptions.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        answerOptions.appendChild(button);
    });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Function to display the results
function endQuiz() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    scoreDisplay.textContent = score;
}

// Function to start the quiz
function startQuiz(subject) {
    subjectSelection.style.display = 'none';
    quizContainer.style.display = 'block';

        switch (subject) {
            case 'math':
                questions = mathQuestions;
                break;
            case 'Eng':
                questions = EngQuestions;
                break;
                case 'Phy':
                    questions = PhyQuestions;
                    break;
                    case 'Bio':
                        questions = BioQuestions;
                        break;
                        case 'Chem':
                            questions = ChemQuestions;
                            break;
                            case 'Econ':
                                questions = EcoQuestions;
                                break;
                                case 'Art':
                                    questions = ArtQuestions;
                                    break;
                                    case 'Lit':
                                        questions = LitQuestions;
                                        break;
                                        case 'Gov':
                                            questions = GovQuestions;
                                            break;
                                            case 'Commer':
                                                questions = Questions;
                                                break;  case 'tec':
                                                questions = Questions;
                                                break;
                                                case 'Agric':
                                                    questions = Questions;
                                                    break;
                                                    case 'fur':
                                                        questions = Questions;
                                                        break;
                                                        case 'CRS':
                                                            questions = Questions;
                                                            break;
                                                            case 'ACC':
                                                                questions = Questions;
                                                                break;
                                                                case 'Civic':
                                                                    questions = Questions;
                                                                    break;
                                                                    case 'Food':
                                                                        questions = Questions;
                                                                        break;
                                                                            case 'history':
                                                                              questions = historyQuestions;
                                                                               break;
                                                                                case 'geography':
                                                                              questions = historyQuestions;
                                                                                break;default:
     
                                                                            }

    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

// Event listener for subject selection
subjectSelection.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        currentSubject = event.target.dataset.subject;
        startQuiz(currentSubject);
    }
});

// Event listener for "Try Again" button
tryAgainButton.addEventListener('click', () => {
    resultsContainer.style.display = 'none';
    subjectSelection.style.display = 'block';
    startQuiz(currentSubject);
});
nextQuestionButton.addEventListener('click', (event) => {
    resultsContainer.style.display = 'none';
    subjectSelection.style.display = 'block';
    startQuiz(currentSubject);
});
previousQuestionButton.addEventListener('click', (event) => {
    resultsContainer.style.display = 'none';
    subjectSelection.style.display = 'block';
    startQuiz(currentSubject);
});
