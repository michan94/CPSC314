sphereIntersect() --> None

nearestT() --> sphereIntersect()

localShade()  --> none

bgColor(ray) --> none

rayCast2() --> bgColor()

rayCast() --> nearestT(), localShade(), rayCast2(), bgColor()

initialize() --> none //Setting up the scene

main()--> initialize(), rayCast(),