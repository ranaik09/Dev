# Using PromptLab for Spec-Kit AI Development

## Table of Contents
1. [Introduction](#introduction)
2. [What is PromptLab?](#what-is-promptlab)
3. [What is Spec-Kit?](#what-is-spec-kit)
4. [Why Combine PromptLab with Spec-Kit?](#why-combine-promptlab-with-spec-kit)
5. [Integration Workflow](#integration-workflow)
6. [Setup Guide](#setup-guide)
7. [Practical Examples](#practical-examples)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [References](#references)

## Introduction

This guide demonstrates how to leverage PromptLab in conjunction with Spec-Kit for building robust, specification-driven AI applications. By combining PromptLab's prompt engineering capabilities with Spec-Kit's structured development approach, teams can create reliable AI systems with faster iteration cycles and better quality control.

## What is PromptLab?

**PromptLab** is a free, lightweight, open-source prompt engineering platform designed for AI experimentation and development. It provides tools for:

- **Prompt Template Management**: Create, version, and manage reusable prompt templates
- **Experimentation**: Test prompts across different AI models (OpenAI, Azure, Ollama, DeepSeek, etc.)
- **Evaluation**: Compare results using built-in or custom metrics
- **Version Control**: Automatically track changes to prompts and datasets
- **Integration**: Seamlessly integrate with web, mobile, or backend applications

### Key Features
- No cloud infrastructure required (runs locally)
- Support for multiple AI model providers
- Asynchronous operations for fast experimentation
- Built-in web interface (PromptLab Studio) for visualization
- Simple Python package installation via pip

### Installation
```bash
pip install promptlab
```

## What is Spec-Kit?

**Spec-Kit** is a toolkit for specification-driven AI development that formalizes requirements into living specifications. It helps teams:

- Capture detailed project requirements and acceptance criteria
- Provide structured templates and CLI workflows
- Guide AI coding agents (GitHub Copilot, Claude, etc.)
- Break down work into small, testable tasks
- Maintain consistency throughout the development lifecycle

### Key Benefits
- Specifications become the source of truth
- Better collaboration between team members
- Easier maintenance and updates
- Improved AI agent output quality
- Reduced technical debt

## Why Combine PromptLab with Spec-Kit?

The combination creates a powerful workflow where:

1. **Spec-Kit** defines WHAT needs to be built (specifications, requirements, constraints)
2. **PromptLab** optimizes HOW to communicate with AI (prompt engineering, testing, validation)

### Synergies

| Aspect | Spec-Kit Contribution | PromptLab Contribution |
|--------|----------------------|------------------------|
| **Clarity** | Defines exact requirements | Tests prompt clarity and effectiveness |
| **Consistency** | Maintains spec integrity | Ensures consistent AI responses |
| **Quality** | Sets acceptance criteria | Validates output against criteria |
| **Iteration** | Structured refinement | Rapid prompt experimentation |
| **Traceability** | Version-controlled specs | Version-controlled prompts |
| **Validation** | Requirement verification | Output evaluation and metrics |

### Benefits of Integration

1. **Faster Development**: Iterate quickly on prompts while maintaining spec alignment
2. **Higher Quality**: Test prompts against spec requirements before production
3. **Better Reliability**: Reduce AI output variability through tested prompts
4. **Improved Governance**: Track both specs and prompts with version control
5. **Team Collaboration**: Clear separation between requirements and implementation
6. **Cost Efficiency**: Optimize prompts to reduce token usage while meeting specs

## Integration Workflow

### Step-by-Step Process

```
┌─────────────────┐
│  Define Specs   │  ← Spec-Kit
│  (What to build)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Create Prompts │  ← PromptLab
│  (How to build) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Test Prompts   │  ← PromptLab
│  Against Specs  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Evaluate & Iter│  ← PromptLab + Spec-Kit
│  Refine as Needed│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deploy to AI   │  ← Production
│  Coding Agents  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Monitor & Feed │  ← Continuous Improvement
│  back to Specs  │
└─────────────────┘
```

### Detailed Workflow

#### Phase 1: Specification Definition (Spec-Kit)
1. **Create Project Spec**: Document requirements, user stories, and acceptance criteria
2. **Define Technical Constraints**: API endpoints, data models, security requirements
3. **Set Success Metrics**: What constitutes successful output
4. **Establish Test Cases**: Expected inputs and outputs

#### Phase 2: Prompt Development (PromptLab)
1. **Design Initial Prompts**: Create prompt templates based on specs
2. **Add Placeholders**: Use variables for dynamic content
3. **Create Evaluation Dataset**: Build test cases from spec requirements
4. **Version Prompts**: Save initial versions for tracking

#### Phase 3: Experimentation (PromptLab)
1. **Run Experiments**: Test prompts with multiple models
2. **Compare Results**: Use PromptLab Studio to visualize differences
3. **Evaluate Against Specs**: Check if outputs meet acceptance criteria
4. **Measure Performance**: Track accuracy, latency, token usage

#### Phase 4: Refinement (Both Tools)
1. **Analyze Gaps**: Identify where outputs don't meet specs
2. **Update Prompts**: Refine wording, structure, or examples
3. **Re-test**: Validate improvements
4. **Update Specs if Needed**: Sometimes specs need clarification

#### Phase 5: Deployment (Production)
1. **Select Best Prompts**: Choose highest-performing versions
2. **Integrate with AI Agents**: Deploy to GitHub Copilot, Claude, etc.
3. **Monitor Results**: Track production performance
4. **Continuous Improvement**: Feed learnings back to both specs and prompts

## Setup Guide

### Prerequisites
- Python 3.8+
- Git for version control
- Access to AI model APIs (OpenAI, Azure, or others)
- Text editor or IDE

### Step 1: Install PromptLab

```bash
# Create a virtual environment (recommended)
python -m venv promptlab-env
source promptlab-env/bin/activate  # On Windows: promptlab-env\Scripts\activate

# Install PromptLab
pip install promptlab
```

### Step 2: Set Up Spec-Kit Structure

```bash
# Create project directory structure
mkdir -p my-ai-project/{specs,prompts,experiments,tests}
cd my-ai-project

# Initialize Git repository
git init
```

### Step 3: Create Specification Files

```bash
# Create a spec template
cat > specs/feature-spec.md << 'EOF'
# Feature Specification

## Overview
[Brief description of the feature]

## Requirements
1. [Requirement 1]
2. [Requirement 2]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Details
- API Endpoints: [list]
- Data Models: [list]
- Security: [requirements]

## Test Cases
| Input | Expected Output | Notes |
|-------|----------------|-------|
| [test input] | [expected output] | [any notes] |
EOF
```

### Step 4: Initialize PromptLab Project

```python
# Create a PromptLab configuration file
cat > promptlab_config.py << 'EOF'
from promptlab import PromptLab

# Initialize PromptLab
lab = PromptLab(
    project_name="my-ai-project",
    models=["gpt-4", "gpt-3.5-turbo"],  # Configure your models
    workspace="./prompts"
)
EOF
```

### Step 5: Create Directory Structure

```
my-ai-project/
├── specs/
│   ├── feature-spec.md
│   ├── api-spec.md
│   └── requirements.md
├── prompts/
│   ├── templates/
│   │   ├── code_generation.txt
│   │   └── test_generation.txt
│   └── versions/
├── experiments/
│   ├── results/
│   └── evaluations/
├── tests/
│   └── datasets/
└── promptlab_config.py
```

## Practical Examples

### Example 1: Building an OAuth 2.0 Authentication System

#### Step 1: Define Specification (Spec-Kit)

```markdown
# OAuth 2.0 Authentication Specification

## Overview
Implement OAuth 2.0 authentication flow with refresh token support.

## Requirements
1. Support authorization code grant flow
2. Secure token storage and refresh mechanism
3. Handle token expiration gracefully
4. Implement PKCE for enhanced security

## Acceptance Criteria
- [ ] Authorization endpoint returns valid auth code
- [ ] Token endpoint exchanges code for access token
- [ ] Refresh token extends session without re-authentication
- [ ] All endpoints use HTTPS
- [ ] Tokens expire after configured time

## Technical Details
- Endpoints: /authorize, /token, /refresh
- Token format: JWT with RS256 signing
- Storage: Secure HTTP-only cookies
- Session timeout: 1 hour (configurable)

## Test Cases
| Scenario | Input | Expected Output |
|----------|-------|----------------|
| Valid auth | code=abc123 | Access token + refresh token |
| Expired token | expired_token | 401 + refresh instruction |
| Invalid code | code=invalid | 400 error |
```

#### Step 2: Create Prompt Template (PromptLab)

```python
# prompts/templates/oauth_code_generation.py
from promptlab import PromptTemplate

oauth_template = PromptTemplate(
    name="oauth_implementation",
    template="""
You are an expert security engineer implementing OAuth 2.0 authentication.

## Requirements:
{requirements}

## Acceptance Criteria:
{acceptance_criteria}

## Technical Constraints:
- Language: {language}
- Framework: {framework}
- Security Standard: OAuth 2.0 with PKCE

Generate production-ready code that:
1. Implements all required endpoints
2. Follows security best practices
3. Includes error handling
4. Has comprehensive test coverage
5. Includes inline documentation

Code must pass all acceptance criteria listed above.
""",
    variables=["requirements", "acceptance_criteria", "language", "framework"]
)
```

#### Step 3: Create Evaluation Dataset (PromptLab)

```python
# experiments/datasets/oauth_tests.jsonl
import json

test_cases = [
    {
        "requirements": "Support authorization code grant flow",
        "acceptance_criteria": "Authorization endpoint returns valid auth code",
        "language": "Python",
        "framework": "Flask",
        "expected_elements": ["@app.route('/authorize')", "authorization_code", "redirect"]
    },
    {
        "requirements": "Secure token storage and refresh mechanism",
        "acceptance_criteria": "Refresh token extends session without re-authentication",
        "language": "Python",
        "framework": "Flask",
        "expected_elements": ["refresh_token", "token_refresh", "secure"]
    }
]

# Save as JSONL
with open('experiments/datasets/oauth_tests.jsonl', 'w') as f:
    for case in test_cases:
        f.write(json.dumps(case) + '\n')
```

#### Step 4: Run Experiments (PromptLab)

```python
# experiments/run_oauth_experiment.py
from promptlab import PromptLab, Experiment
from prompts.templates.oauth_code_generation import oauth_template

# Initialize PromptLab
lab = PromptLab(project_name="oauth-implementation")

# Create experiment
experiment = Experiment(
    name="oauth_v1_experiment",
    prompt_template=oauth_template,
    dataset="experiments/datasets/oauth_tests.jsonl",
    models=["gpt-4", "gpt-3.5-turbo"]
)

# Run experiment
results = lab.run_experiment(experiment)

# Evaluate results against spec criteria
def validate_against_spec(output, expected_elements):
    """Check if generated code meets spec requirements"""
    score = 0
    for element in expected_elements:
        if element in output:
            score += 1
    return score / len(expected_elements)

# Apply custom evaluation
for result in results:
    result['spec_compliance'] = validate_against_spec(
        result['output'], 
        result['expected_elements']
    )

# View results in PromptLab Studio
lab.studio.launch()  # Opens web interface for visualization
```

#### Step 5: Refine and Deploy

```python
# After reviewing results, select best-performing prompt
best_prompt = lab.get_best_prompt(
    experiment="oauth_v1_experiment",
    metric="spec_compliance",
    threshold=0.9
)

# Export for use with AI coding agents
best_prompt.export(format="github_copilot", path="./prompts/production/")
```

### Example 2: API Documentation Generation

#### Spec-Kit Specification

```markdown
# API Documentation Requirements

## Overview
Generate comprehensive API documentation from code.

## Requirements
1. Document all public endpoints
2. Include request/response examples
3. Document error codes
4. Add authentication requirements

## Acceptance Criteria
- [ ] All endpoints listed with HTTP methods
- [ ] Request parameters documented with types
- [ ] Response schemas included
- [ ] Example requests/responses provided
- [ ] Authentication methods described

## Format
- Output: OpenAPI 3.0 YAML
- Style: Clear, concise, developer-friendly
```

#### PromptLab Implementation

```python
# prompts/templates/api_doc_generation.py
from promptlab import PromptTemplate

api_doc_template = PromptTemplate(
    name="api_documentation",
    template="""
Generate OpenAPI 3.0 documentation for the following API code.

## Code:
{code}

## Requirements:
{requirements}

## Output Format:
OpenAPI 3.0 YAML specification

Ensure the documentation:
1. Is complete and accurate
2. Includes all endpoints
3. Documents all parameters and responses
4. Includes practical examples
5. Follows OpenAPI 3.0 standards

Documentation must meet all acceptance criteria:
{acceptance_criteria}
""",
    variables=["code", "requirements", "acceptance_criteria"]
)

# Create evaluation function
def evaluate_api_docs(generated_docs, spec):
    """Validate generated docs against spec requirements"""
    checks = {
        "has_openapi_version": "openapi: 3.0" in generated_docs,
        "has_endpoints": "paths:" in generated_docs,
        "has_schemas": "schemas:" in generated_docs,
        "has_examples": "example:" in generated_docs,
        "has_security": "security:" in generated_docs
    }
    return sum(checks.values()) / len(checks)
```

### Example 3: Test Case Generation

```python
# prompts/templates/test_generation.py
from promptlab import PromptTemplate

test_template = PromptTemplate(
    name="test_generation",
    template="""
Generate comprehensive test cases for the following specification.

## Specification:
{spec}

## Acceptance Criteria:
{acceptance_criteria}

## Test Framework:
{test_framework}

Generate tests that:
1. Cover all acceptance criteria
2. Include positive and negative cases
3. Test edge cases
4. Follow testing best practices
5. Are maintainable and readable

Each test should map directly to an acceptance criterion.
""",
    variables=["spec", "acceptance_criteria", "test_framework"]
)

# Evaluation based on spec coverage
def evaluate_test_coverage(tests, acceptance_criteria):
    """Check if tests cover all acceptance criteria"""
    criteria_count = len(acceptance_criteria)
    covered = 0
    
    for criterion in acceptance_criteria:
        # Check if criterion is referenced in tests
        if any(criterion.lower() in test.lower() for test in tests):
            covered += 1
    
    return covered / criteria_count
```

## Best Practices

### 1. Specification Management

**DO:**
- Keep specs version-controlled alongside prompts
- Write clear, measurable acceptance criteria
- Include concrete examples in specs
- Update specs based on learnings from experiments
- Make specs the single source of truth

**DON'T:**
- Write vague or ambiguous requirements
- Skip acceptance criteria definition
- Let specs diverge from implementation
- Forget to version control spec changes

### 2. Prompt Engineering

**DO:**
- Reference spec requirements directly in prompts
- Include acceptance criteria in prompt templates
- Test prompts with multiple models
- Use concrete examples from specs
- Version all prompt changes
- Measure prompt performance against spec metrics

**DON'T:**
- Create prompts without consulting specs
- Skip experimentation and evaluation
- Use vague instructions
- Ignore performance metrics
- Deploy untested prompts

### 3. Evaluation Strategy

**DO:**
- Create custom evaluation functions based on specs
- Use both automated and manual evaluation
- Track multiple metrics (accuracy, compliance, cost)
- Establish baseline performance requirements
- Document evaluation methodology

**DON'T:**
- Rely solely on automated metrics
- Skip spec compliance validation
- Ignore edge cases
- Deploy without thorough evaluation

### 4. Workflow Integration

**DO:**
- Integrate PromptLab into CI/CD pipeline
- Automate regression testing of prompts
- Monitor production prompt performance
- Create feedback loops between prod and dev
- Document prompt-to-spec mappings

**DON'T:**
- Treat prompt engineering as one-time task
- Skip production monitoring
- Ignore user feedback
- Break spec-prompt traceability

### 5. Team Collaboration

**DO:**
- Separate spec writing from prompt engineering roles
- Share experiment results with team
- Review prompts like code reviews
- Maintain prompt library for reuse
- Document lessons learned

**DON'T:**
- Work in silos
- Skip peer review
- Forget to share knowledge
- Reinvent prompts unnecessarily

### 6. Performance Optimization

**DO:**
- Test prompts for token efficiency
- Benchmark different model providers
- Optimize for both quality and cost
- Cache frequently used results
- Use async operations when possible

**DON'T:**
- Ignore token costs
- Skip model comparison
- Over-engineer prompts
- Use synchronous calls unnecessarily

### 7. Security and Privacy

**DO:**
- Sanitize sensitive data in test datasets
- Review generated code for security issues
- Use secure credential management
- Audit AI-generated outputs
- Follow data privacy regulations

**DON'T:**
- Include real credentials in prompts
- Skip security review of generated code
- Expose sensitive data to AI models
- Trust AI outputs blindly

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: AI Output Doesn't Meet Spec Requirements

**Symptoms:**
- Generated code fails acceptance criteria
- Outputs are inconsistent
- Quality varies across runs

**Solutions:**
1. **Refine Spec Clarity**: Make requirements more specific and measurable
2. **Enhance Prompt**: Include more examples from spec in prompt
3. **Add Constraints**: Explicitly list what NOT to do
4. **Test Different Models**: Some models better understand certain requirements
5. **Iterate Prompt Structure**: Try different prompt formats

**Example Fix:**
```python
# Before (vague)
template = "Generate code for {feature}"

# After (specific)
template = """
Generate code for {feature} that meets these requirements:
{requirements}

Must satisfy acceptance criteria:
{acceptance_criteria}

Use these constraints:
{constraints}

Here's an example of correct implementation:
{example}
"""
```

#### Issue 2: Slow Experimentation Cycles

**Symptoms:**
- Waiting too long for experiment results
- Can't iterate quickly
- Blocking team progress

**Solutions:**
1. **Use Async Operations**: Enable parallel processing in PromptLab
2. **Start with Smaller Datasets**: Test with subset before full run
3. **Use Faster Models First**: Iterate with gpt-3.5, finalize with gpt-4
4. **Cache Results**: Reuse previous results when possible
5. **Optimize Prompts**: Remove unnecessary verbosity

**Example:**
```python
# Enable async for faster experiments
experiment = Experiment(
    name="fast_iteration",
    prompt_template=template,
    dataset="small_test_set.jsonl",
    models=["gpt-3.5-turbo"],  # Fast model for iteration
    async_mode=True,
    concurrency=5  # Run 5 in parallel
)
```

#### Issue 3: Prompts Work in Testing But Fail in Production

**Symptoms:**
- Lab results look good
- Production outputs are poor
- User complaints about quality

**Solutions:**
1. **Use Production-Like Data**: Test with realistic examples
2. **Expand Test Coverage**: Include edge cases and corner cases
3. **Add Production Monitoring**: Track actual performance
4. **Create Feedback Loop**: Feed production issues back to lab
5. **Version Control Everything**: Track what changed

**Prevention Strategy:**
```python
# Create production validation dataset
prod_validation = {
    "source": "production_samples",  # Real user data (anonymized)
    "edge_cases": True,
    "size": 1000,  # Large enough to be representative
    "periodic_refresh": "weekly"  # Keep dataset current
}

# Run regression tests
lab.validate_against_production(
    prompt=current_prompt,
    validation_dataset=prod_validation,
    success_threshold=0.95  # 95% must pass
)
```

#### Issue 4: Specs and Prompts Drift Apart

**Symptoms:**
- Prompts reference old requirements
- New spec features not in prompts
- Inconsistent behavior

**Solutions:**
1. **Link Prompts to Spec Versions**: Track dependencies
2. **Automated Sync Checks**: CI/CD validation
3. **Regular Audits**: Review alignment quarterly
4. **Single Source of Truth**: Always start from spec

**Implementation:**
```python
# Add spec version to prompt metadata
prompt = PromptTemplate(
    name="feature_implementation",
    template=template_text,
    metadata={
        "spec_version": "v2.1.0",
        "spec_file": "specs/feature-spec.md",
        "last_sync": "2026-01-11",
        "acceptance_criteria_count": 12
    }
)

# Validation function
def check_spec_sync(prompt, spec):
    """Ensure prompt aligns with current spec version"""
    if prompt.metadata["spec_version"] != spec.version:
        raise ValueError(f"Prompt outdated: {prompt.metadata['spec_version']} vs {spec.version}")
```

#### Issue 5: Evaluation Metrics Don't Align with Business Goals

**Symptoms:**
- High scores but users unhappy
- Metrics look good but output is wrong
- Can't explain why prompts work/don't work

**Solutions:**
1. **Define Business Metrics**: Link to actual goals
2. **Custom Evaluation Functions**: Based on spec requirements
3. **Human Evaluation**: Include manual review
4. **A/B Testing**: Compare with real users
5. **Feedback Integration**: Use actual user feedback

**Example:**
```python
def business_aligned_eval(output, spec):
    """Evaluate based on actual business requirements"""
    
    # Technical correctness (from spec)
    technical_score = check_acceptance_criteria(output, spec.criteria)
    
    # User satisfaction proxy
    readability_score = check_code_quality(output)
    
    # Business impact
    performance_score = estimate_performance(output)
    security_score = check_security_requirements(output, spec.security)
    
    # Weighted combination based on business priorities
    return {
        "technical": technical_score * 0.3,
        "readability": readability_score * 0.2,
        "performance": performance_score * 0.2,
        "security": security_score * 0.3,
        "overall": (technical_score * 0.3 + 
                   readability_score * 0.2 + 
                   performance_score * 0.2 + 
                   security_score * 0.3)
    }
```

### Debugging Tips

1. **Enable Verbose Logging**
   ```python
   lab = PromptLab(project_name="debug", log_level="DEBUG")
   ```

2. **Compare Side-by-Side**
   - Use PromptLab Studio to visualize differences
   - Track which spec requirements each output meets

3. **Incremental Testing**
   - Test one requirement at a time
   - Build up complexity gradually

4. **Version Everything**
   - Tag working versions
   - Easy rollback when something breaks

5. **Document Experiments**
   - Note what worked and what didn't
   - Share learnings with team

## Advanced Topics

### 1. Multi-Agent Workflows

Use PromptLab to coordinate multiple AI agents working on different parts of a spec:

```python
# Orchestrate multiple specialized agents
class SpecKitAgentOrchestrator:
    def __init__(self):
        self.code_agent = PromptTemplate(name="code_generator", ...)
        self.test_agent = PromptTemplate(name="test_generator", ...)
        self.review_agent = PromptTemplate(name="code_reviewer", ...)
    
    def process_spec(self, spec):
        # Agent 1: Generate code
        code = self.code_agent.run(spec=spec.requirements)
        
        # Agent 2: Generate tests
        tests = self.test_agent.run(
            code=code, 
            criteria=spec.acceptance_criteria
        )
        
        # Agent 3: Review both
        review = self.review_agent.run(
            code=code, 
            tests=tests, 
            spec=spec
        )
        
        return code, tests, review
```

### 2. Continuous Learning

Implement feedback loops to improve prompts over time:

```python
class PromptEvolution:
    def __init__(self, lab):
        self.lab = lab
        self.feedback_db = FeedbackDatabase()
    
    def collect_production_feedback(self, output_id, rating, comments):
        """Collect user feedback on AI outputs"""
        self.feedback_db.store({
            "output_id": output_id,
            "rating": rating,
            "comments": comments,
            "timestamp": datetime.now()
        })
    
    def evolve_prompts(self):
        """Analyze feedback and suggest prompt improvements"""
        low_rated = self.feedback_db.get_low_rated_outputs()
        
        # Identify patterns in failures
        patterns = self.analyze_failure_patterns(low_rated)
        
        # Suggest prompt improvements
        for pattern in patterns:
            improvement = self.generate_improvement(pattern)
            self.lab.create_experiment(improvement)
```

### 3. Spec-Driven Testing

Automatically generate test suites from specs:

```python
def spec_to_tests(spec_file, prompt_template):
    """Convert spec acceptance criteria to test cases"""
    spec = parse_spec(spec_file)
    
    test_cases = []
    for criterion in spec.acceptance_criteria:
        test_case = {
            "name": f"test_{criterion.id}",
            "input": criterion.example_input,
            "expected_output": criterion.expected_output,
            "validation": criterion.validation_rule
        }
        test_cases.append(test_case)
    
    return test_cases

# Use in PromptLab experiment
test_dataset = spec_to_tests("specs/feature-spec.md", my_template)
experiment = Experiment(
    name="spec_driven_tests",
    dataset=test_dataset,
    auto_validate=True
)
```

## References

### Documentation
1. [PromptLab Official Documentation](https://github.com/cognix-labs/promptlab)
2. [PromptLab PyPI Package](https://pypi.org/project/promptlab/)
3. [Spec-Kit Official Site](https://speckit.org/)
4. [GitHub Spec-Kit Blog Post](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
5. [MCP vs Spec-Kit Comparison](mcp-vs-spec-kit-comparison.md)

### Related Resources
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [AI Code Generation Best Practices](https://github.blog/engineering/ai/)
- [Specification-Driven Development](https://intuitionlabs.ai/articles/spec-driven-development-spec-kit)
- [Testing AI Applications](https://www.deeplearning.ai/short-courses/quality-safety-llm-applications/)

### Community
- PromptLab GitHub Issues and Discussions
- Spec-Kit Community Forum
- AI Development Best Practices

### Tools Integration
- GitHub Copilot
- Claude
- Cursor IDE
- VS Code Extensions

## Appendix A: Quick Reference Commands

### PromptLab Commands
```bash
# Install
pip install promptlab

# Initialize project
promptlab init my-project

# Run experiment
promptlab experiment run --config experiment.yaml

# Launch Studio
promptlab studio

# Export prompt
promptlab export --prompt my-prompt --format json
```

### Common Python Snippets
```python
# Initialize PromptLab
from promptlab import PromptLab
lab = PromptLab(project_name="my-project")

# Create prompt template
from promptlab import PromptTemplate
template = PromptTemplate(name="my-prompt", template="...")

# Run experiment
from promptlab import Experiment
exp = Experiment(name="test", prompt_template=template)
results = lab.run_experiment(exp)

# Evaluate
score = lab.evaluate(results, metric="custom")
```

## Appendix B: Spec Template

```markdown
# [Feature Name] Specification

## Overview
[Brief description]

## Requirements
1. [Functional requirement 1]
2. [Functional requirement 2]
3. [Non-functional requirement 1]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Technical Details
- **Architecture**: [description]
- **Data Models**: [list]
- **APIs**: [list]
- **Security**: [requirements]
- **Performance**: [requirements]

## Test Cases
| ID | Scenario | Input | Expected Output | Priority |
|----|----------|-------|-----------------|----------|
| TC1 | [scenario] | [input] | [output] | High |

## Dependencies
- [Dependency 1]
- [Dependency 2]

## Constraints
- [Constraint 1]
- [Constraint 2]

## Success Metrics
- [Metric 1]: [target]
- [Metric 2]: [target]
```

## Appendix C: Prompt Template Best Practices

### Structure
```python
template = """
## Context
[Background information]

## Requirements
{requirements}

## Acceptance Criteria
{acceptance_criteria}

## Constraints
{constraints}

## Examples
{examples}

## Task
[Clear instruction on what to generate]

## Output Format
[Specific format requirements]

## Validation
[How output will be validated]
"""
```

### Variables to Include
- `{requirements}`: From spec
- `{acceptance_criteria}`: From spec
- `{constraints}`: Technical limitations
- `{examples}`: Sample inputs/outputs
- `{context}`: Additional background

## Version History

- **v1.0** (2026-01-11): Initial guide created
  - Introduction to PromptLab and Spec-Kit integration
  - Complete workflow documentation
  - Practical examples with OAuth and API documentation
  - Best practices and troubleshooting guide
  - Advanced topics and references

---

**Document Status:** Active  
**Last Updated:** 2026-01-11  
**Maintained By:** Development Research Team  
**Related Documents:** [MCP vs Spec-Kit Comparison](mcp-vs-spec-kit-comparison.md)
