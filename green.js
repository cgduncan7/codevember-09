function Green(sketch) {
  this.sketch = sketch;
  this.age = 0;
  this.trunk = new Branch(sketch.width / 2, sketch.height, -Math.PI / 2);
}

Green.prototype.update = function() {
  if (this.age < 500) {
    this.trunk.update();
  }
  this.age += 1;
};

Green.prototype.draw = function() {
  this.trunk.draw(this.sketch);
};

function Branch(x, y, a) {
  this.x = x;
  this.y = y;
  this.ang = a;
  this.len = 1;
  this.thk = 1;
  this.branchChance = 0;
  this.branches = [];
  this.leafChance = 0;
  this.leaves = [];
}

Branch.prototype.spawnBranch = function() {
  const ex = Math.cos(this.ang) * this.len + this.x;
  const ey = Math.sin(this.ang) * this.len + this.y;
  const offset = Math.random() * (Math.PI/2) - (Math.PI/4);
  const a = this.ang + offset;
  const branch = new Branch(ex, ey, a);
  this.branches.push(branch);
};

Branch.prototype.spawnLeaf = function() {
  const ex = Math.cos(this.ang + (Math.random() * 0.3) - 0.15) * (this.len + this.thk * 2) + this.x;
  const ey = Math.sin(this.ang + (Math.random() * 0.3) - 0.15) * (this.len + this.thk * 2) + this.y;
  const leaf = [ex, ey, this.thk, 0, [0, 255 - Math.random() * 25, 0]];
  this.leaves.push(leaf);
};

Branch.prototype.grow = function() {
  this.len += 1;
  this.thk += 0.05;
}

Branch.prototype.update = function() {
  this.grow();
  for (let b of this.branches) {
    b.update();
  }

  for (let l of this.leaves) {
    if (l[3] < 50) {
      l[2] += 1;
      l[3] += 1;
    } else if (l[2] > 0) {
      l[2] -= 1;
    } else {
      l[2] = 0;
    }
  }

  if (Math.random() < this.branchChance) {
    this.spawnBranch();
    this.branchChance = 0;
  } else {
    this.branchChance += 0.0001;
  }

  if (Math.random() < this.leafChance) {
    this.spawnLeaf();
    this.leafChance = 0;
  } else {
    this.leafChance += 0.05;
  }
};

Branch.prototype.draw = function(sketch) {
  const ex = Math.cos(this.ang) * this.len + this.x;
  const ey = Math.sin(this.ang) * this.len + this.y;
  sketch.stroke(100, 50, 50);
  sketch.strokeWeight(this.thk);
  sketch.line(this.x, this.y, ex, ey);

  for (let b of this.branches) {
    b.draw(sketch);
  }

  for (let l of this.leaves) {
    const [x, y, r, a, c] = l;
    if (r === 0) continue;
    sketch.stroke(c[0], c[1], c[2]);
    sketch.fill(c[0], c[1], c[2]);
    sketch.ellipse(x, y, r, r);
  }
};