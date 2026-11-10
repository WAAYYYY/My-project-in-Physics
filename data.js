const data = {
  nodes: [
    {
      id: "algebra",
      label: "Algebra",
      description: [
        "Algebra studies sets equipped with operations and the rules those operations satisfy. Groups describe reversible operations and their symmetries; rings and fields combine addition and multiplication; vector spaces make it possible to form and compare linear combinations. These structures are not just abstract classifications: each one captures a different kind of mathematical behavior.",
        "Maps that preserve a structure, called homomorphisms, let us compare objects while retaining the properties that matter. In physics, algebra organizes transformations, conservation laws, state spaces, and the symmetries of a model. It also provides the common language behind linear algebra, representation theory, Lie theory, and gauge theories."
      ],
      articles: [
        { title: "Exponential Map and One-Parameter Subgroups", url: "Articles_Exercises/SO(n)_SU(n).html" }
      ]
    },
    {
      id: "linalg",
      label: "Linear Algebra",
      description: [
        "Linear algebra studies vector spaces and the linear maps between them. A choice of basis turns vectors and maps into coordinates and matrices, making calculations concrete without changing the underlying objects. Eigenvalues and eigenvectors identify directions that a transformation preserves, while rank, determinant, and inner products reveal whether a map is invertible, volume-preserving, or angle-preserving.",
        "In physics, these ideas describe normal modes, coupled oscillators, rotations, and systems of linear equations. Quantum mechanics relies especially heavily on linear algebra: states belong to vector spaces, observables act as operators, and measurement outcomes are related to an operator's spectrum."
      ],
      articles: [
        { title: "The Coherent States of the Harmonic Oscillator", url: "Articles_Exercises/coherent states.html" },
        { title: "Particles Trapped in a Ring Potential", url: "Articles_Exercises/Ring potential.html" }
      ]
    },
    {
      id: "lie",
      label: "Lie Groups and Algebras",
      description: [
        "A Lie group is a group that is also a smooth space, so its elements vary continuously and its multiplication and inverse are differentiable. Rotations and many other continuous transformations form Lie groups. The associated Lie algebra is the tangent space at the identity; its bracket records how infinitesimal transformations fail to commute.",
        "The exponential map connects infinitesimal generators to finite transformations. This makes Lie groups and Lie algebras useful for classifying continuous symmetries, building their representations, and deriving conservation laws. They are central to angular momentum in quantum mechanics and to the mathematical structure of gauge theories."
      ],
      articles: [
        { title: "Exponential Map and One-Parameter Subgroups", url: "Articles_Exercises/SO(n)_SU(n).html" }
      ]
    },
    {
      id: "analysis",
      label: "Analysis",
      description: [
        "Analysis gives precise meaning to limits, convergence, continuity, differentiation, and integration. It studies sequences and series of functions, differential equations, and the behavior of functions under approximation. Functional analysis extends these ideas to spaces whose elements are functions and to operators acting on those spaces.",
        "This is the mathematical foundation of continuous models in physics. Equations of motion, wave and field equations, Fourier transforms, and variational principles all rely on analytical tools. Analysis also clarifies whether solutions exist, whether they are unique, and whether approximate or numerical solutions converge to the intended physical result."
      ],
      articles: [
        { title: "Momentum as an Infinitesimal Generator of Translation", url: "Articles_Exercises/Impulse as an infinidesimal generator of translation.html" },
        { title: "Particles Trapped in a Ring Potential", url: "Articles_Exercises/Ring potential.html" }
      ]
    },
    {
      id: "topology",
      label: "Topology",
      description: [
        "Topology studies properties that remain unchanged under continuous deformation. It focuses on ideas such as connectedness, holes, paths, and homotopy classes, without requiring lengths or angles. Topological spaces provide a setting for asking which features of a shape are intrinsic and which depend only on a particular geometric description.",
        "In physics, topological invariants help distinguish phases of matter and describe defects such as vortices. They can explain why certain states or boundary behaviors remain robust when a system is perturbed. Topology also constrains what kinds of fields can exist globally on a space, as illustrated by the Hairy Ball Theorem."
      ],
      articles: [
        { title: "Hairy Ball Theorem", url: "Articles_Exercises/Hairy Ball Theorem.html" }
      ]
    },
    {
      id: "diffgeo",
      label: "Differential Geometry",
      description: [
        "Differential geometry describes smooth spaces that may be curved. Manifolds provide local coordinates while keeping the underlying space independent of any one coordinate system. Tangent and cotangent spaces describe directions and covectors; metrics measure lengths and angles; connections define parallel transport and curvature.",
        "These tools let physicists formulate laws in a coordinate-independent way. General relativity interprets gravity through the geometry of spacetime, while classical mechanics uses the geometry of configuration spaces. Differential forms and vector fields also provide a natural language for electromagnetism and for studying global constraints on physical fields."
      ],
      articles: [
        { title: "Hairy Ball Theorem", url: "Articles_Exercises/Hairy Ball Theorem.html" },
        { title: "Maxwell's Equations in Differential Form", url: "Articles_Exercises/Maxwell.html" }
      ]
    },
    {
      id: "qm",
      label: "Quantum Mechanics",
      description: [
        "Quantum mechanics describes physical systems at microscopic scales. A pure state is represented by a ray in a complex Hilbert space, and measurable quantities are represented by self-adjoint operators. The possible outcomes of an ideal measurement are associated with the operator's spectrum, while the state determines the probabilities of those outcomes.",
        "Between measurements, the state evolves according to a dynamical law such as the Schrodinger equation. Superposition and entanglement produce correlations with no classical counterpart, while symmetries and conservation laws organize the theory. Quantum mechanics underlies atomic physics, chemistry, quantum information, and many models of condensed matter."
      ],
      articles: [
        { title: "The Coherent States of the Harmonic Oscillator", url: "Articles_Exercises/coherent states.html" },
        { title: "Impulse as an Infinitesimal Generator of Translation", url: "Articles_Exercises/Impulse as an infinidesimal generator of translation.html" },
        { title: "Particles Trapped in a Ring Potential", url: "Articles_Exercises/Ring potential.html" }
      ]
    },
    {
      id: "tensor",
      label: "Tensor Calculus",
      description: [
        "Tensor calculus describes quantities according to how their components transform when coordinates change. Scalars, vectors, covectors, and higher-rank tensors are unified by multilinear algebra. The tensor transformation law ensures that equations written with tensors express geometric and physical relationships rather than artifacts of a coordinate choice.",
        "On curved spaces, the covariant derivative accounts for the variation of the local basis and makes it possible to differentiate tensor fields consistently. Tensor calculus is essential in general relativity and continuum mechanics, and is used to express stress, energy-momentum, electromagnetic fields, and other coordinate-independent physical quantities."
      ],
      articles: [
        { title: "Maxwell's Equations in Differential Form", url: "Articles_Exercises/Maxwell.html" }
      ]
    },
    {
      id: "bundles",
      label: "Fiber Bundles",
      description: [
        "A fiber bundle is a space organized over a base space, with a fiber attached to each point. Locally it resembles a product, but different local descriptions are glued together by transition functions. A section chooses one element from each fiber, making bundles a natural way to describe fields that vary over space or spacetime.",
        "Connections define how to compare or transport values in neighboring fibers; their curvature measures the failure of transport around a small loop to return unchanged. This geometry appears in gauge theory, where gauge potentials and field strengths have bundle-based interpretations. The topology of a bundle can also impose global restrictions on which sections exist."
      ],
      articles: [
        { title: "Hairy Ball Theorem", url: "Articles_Exercises/Hairy Ball Theorem.html" }
      ]
    },
    {
      id: "gr",
      label: "General Relativity",
      description: [
        "General relativity models spacetime as a four-dimensional manifold equipped with a Lorentzian metric. The metric determines elapsed proper time, causal structure, and the paths followed by freely falling bodies. Einstein's field equations relate spacetime curvature to the distribution and flow of matter and energy.",
        "Gravity is therefore described as dynamical geometry rather than as an ordinary force acting in a fixed background. The theory accounts for phenomena such as gravitational waves, black holes, and the expansion of the universe. Its mathematical formulation depends on differential geometry and tensor calculus, and it reduces locally to special relativity in freely falling frames."
      ],
      articles: [
        { title: "Maxwell's Equations in Differential Form", url: "Articles_Exercises/Maxwell.html" }
      ]
    },
    {
      id: "gauge",
      label: "Gauge Theories",
      description: [
        "A gauge theory is built around a local symmetry: the mathematical description can be changed independently at each spacetime point without changing observable predictions. Gauge fields make this local freedom consistent, and their curvature describes the corresponding field strength and interaction.",
        "Electromagnetism is the familiar abelian example, while Yang-Mills theories extend the framework to non-commuting symmetry groups. Gauge theories form the basis of the Standard Model of particle physics and connect local symmetry, geometry, and the dynamics of fundamental interactions."
      ],
      articles: [
        { title: "Maxwell's Equations in Differential Form", url: "Articles_Exercises/Maxwell.html" }
      ]
    }
  ],
  links: [

    { source: "algebra",  target: "linalg", type: "dashed"  },
    { source: "algebra",  target: "lie", type: "dashed" },
    { source: "diffgeo", target: "analysis" },
    { source: "diffgeo",  target: "tensor"},
    { source: "diffgeo",  target: "bundles"},
    { source: "tensor",   target: "gr",  type: "dashed" },
    { source: "bundles",  target: "gauge", type: "dashed" },


    { source: "diffgeo",  target: "topology",},
    { source: "diffgeo",  target: "algebra",},
    { source: "diffgeo",  target: "lie",},
    { source: "diffgeo",  target: "gr",},
    { source: "lie",      target: "gauge",  type: "dashed" },
    { source: "qm", target: "linalg" },
    { source: "qm", target: "analysis"},
    { source: "qm", target: "lie",      type: "dashed" },
    { source: "qm", target: "gauge",    type: "dashed" },
    { source: "qm", target: "gr",       type: "dashed" },
  ]
};