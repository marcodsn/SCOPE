# SCOPE: Self-Cognitive Observation and Performance Evaluation

<!-- ![SCOPE Logo](https://via.placeholdview -->

SCOPE is an open-source cognitive assessment tool designed to help individuals track and monitor their cognitive abilities over time. Built with Svelte, it provides a suite of scientifically-backed tests measuring attention, memory, executive function, and language processing.

<!-- [![License](https://img.shields.io/badge/License-MIT-blue.svimg.shields.io/badge/Builtures -->

- **Comprehensive Assessment Suite**: Multiple tests across four cognitive domains
- **Personalized Tracking**: Monitor your cognitive performance over time
- **Interactive Visualizations**: Understand your results through intuitive charts and graphs
- **Scientific Approach**: Based on established neuropsychological testing paradigms
- **Privacy-Focused**: All data stays on your device by default
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Cognitive Domains

### Attention Assessment
- **Sustained Attention Test**: Identify specific patterns in number sequences
- **Flanker Test**: Focus on center stimuli while ignoring distractors

### Memory Assessment
- **Pattern Recognition**: Identify previously viewed words in a sequence
- **Spatial Memory Test**: Recall the positions of briefly presented visual stimuli
- **Digital Span Test**: Remember digits that appeared before or after a target

### Executive Function Assessment
- **3-Back Task**: Identify when current stimuli match those from 3 steps earlier
- **Stroop Test**: Name colors while ignoring conflicting word meanings
- **Dual Task Performance**: Measure multitasking ability

### Language and Reasoning
- **Verbal Fluency**: Generate words matching specific criteria under time pressure
- **Vocabulary Task**: Match words with correct definitions or images

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/marcodsn/SCOPE.git
cd SCOPE

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see the application running.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Usage Guide

1. **Create a Profile**: Enter basic information to initialize your testing baseline
2. **Take Assessments**: Complete the full battery or select specific tests
3. **View Results**: See your scores compared to your baseline and normative data
4. **Track Progress**: Return monthly to track changes in your cognitive performance

## Development

### Key Technologies

- **Svelte/SvelteKit**: Frontend framework
- **TailwindCSS**: Styling (optional)

### Testing

```bash
# Run tests
npm test
# or
yarn test
```

## Scientific Background

SCOPE is based on established neuropsychological assessment paradigms. Each test has been adapted from validated cognitive measures used in clinical and research settings.

The scoring algorithms account for factors like:
- Age-related cognitive differences
- Practice effects
- Response time variability
- Error patterns

## Privacy

By self-hosting SCOPE, all data will be stored locally on your computer! No personal information or test results will be transmitted to any server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The many researchers who developed and validated the original cognitive assessment paradigms
- The Svelte team for creating an excellent framework
- All contributors and testers who help improve SCOPE

---

**Note**: SCOPE is designed for personal cognitive monitoring and is not intended to diagnose or treat any medical condition. If you have concerns about cognitive changes, please consult a healthcare professional.
