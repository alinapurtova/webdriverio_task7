# Telnyx WebdriverIO Tests for Task 7

## Summary  
This repository contains **20 automated end-to-end tests** for the [Telnyx](https://telnyx.com) website, written in **WebdriverIO** using the **POM** pattern.  
The tests validate UI functionality, navigation, forms, and interactive features across multiple Telnyx pages such as Home, Products, Contact Us, Global Coverage, and more.

---

## Requirements  

Before running the tests, make sure you have the following installed:

- **Node.js** (>= 18.0.0)
- **Webdriver**
- **npm**
- **Git**

---

## Installation Steps  

**Clone the repository:**
```bash
git clone https://github.com/alinapurtova/webdriverio_task7.git
```
**Setup**
```bash
npm install
```
**Run tests locally with Chrome, Edge and Firefox**
```bash
npm run test
```

**Run tests in Chrome**
```bash
npm run test:chrome
```
**Run tests in Edge**
```bash
npm run test:edge
```
**Run tests in Firefox**
```bash
npm run test:firefox
```

**Run only cookies tests (one file)**
```bash
npm run test:cookies
```
**Run only global coverage tests (one file)**
```bash
npm run test:globalcoverage
```
**Run only homepage tests (one file)**
```bash
npm run test:homepage
```
**Run only liveperson tests (one file)**
```bash
npm run test:liveperson
```
**Run only navigation tests (one file)**
```bash
npm run test:navigation
```
**Run only searches tests (one file)**
```bash
npm run test:searches
```
**Run only sign Up tests (one file)**
```bash
npm run test:signup
```

**Generate report**
```bash
npm run allure:generate
```
**Open report**
```bash
npm run allure:open
```

---

## Tests Summary

### Navigation tests
| Test ID    | Description                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------|
| **TC-001** | Verify user can navigate to the Pricing page from the header                                    |
| **TC-002** | Verify the Contact Us form is visible and functional                                            |
| **TC-003** | Verify that the Login form is displayed in new tab                                              |
| **TC-004** | Verify the social media links in the footer                                                     |

### SignUp Page tests
| Test ID    | Description                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------|
| **TC-005** | Verify that the Sign Up page opens correctly                                                    |
| **TC-006** | Verify Sign Up form validation with empty submit                                                |
| **TC-007** | Verify promocode field appears on the Sign Up page                                              |

### Cookie Banner tests
| Test ID    | Description                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------|
| **TC-008** | Verify cookie banner appears and can be accepted                                                |
| **TC-009** | Verify cookie banner can be set up individually                                                 |

### Searches and FAQ features tests
| Test ID    | Description                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------|
| **TC-010** | Verification of the search functionality on the All Solutions page                              |
| **TC-011** | Verify search bar returns results for a keyword                                                 |
| **TC-012** | Verify FAQ section functionality on the RCS page                                                |

### HomePage features tests
| Test ID    | Description                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------|
| **TC-013** | Verify that the chat/contact widget appears and functions correctly                             |
| **TC-014** | Verify "Call your agent" button scrolls to the interactive tool demo section                    |
| **TC-015** | Verify that the “Text to Speech” tab works correctly                                            |
| **TC-016** | Verify that the “Text to Speech” audio can be played                                            |

### Liveperson Customer Story video
| Test ID    | Description                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------|
| **TC-017** | Verify video playback functionality on the Liveperson Customer Story page                       |

### Global Coverage page
| Test ID    | Description                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------|
| **TC-018** | Filtering Global Coverage table by country                                                      |
| **TC-019** | Validation of reset button after filter Global Coverage table                                   |
| **TC-020** | Submit "Download full coverage" form with valid data on the Global Coverage page                |
| **TC-021** | Submit "Download full coverage" form with invalid email on the Global Coverage page             |

---

## Docker  

**To build image**
```bash
docker build -t webdriver-tests .
```
**To run image**
```bash
docker run --rm webdriver-tests
```

---

## CI/CD
Tests are executed automatically via GitHub Actions with results reported to the branch allure-report and uploaded to Pages.