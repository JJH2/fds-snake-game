import { ROWS, COLS, INITIAL_DELAY } from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    {x: 3, y: 0},
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0}
  ];

  // 먹이의 좌표
  this.fruit = {x: 5, y: 10};
  // 뱀의 방향
  this.direction = 'right';

  //과일을 랜덤으로 생성
  this.random = () => {
    let x = Math.floor(Math.random() * COLS);
    let y = Math.floor(Math.random() * ROWS);
    let same = this.joints.some(item => {
      if (item.x === this.x && item.y === this.y) {
        return true;
      } else {
        this.fruit.x = x;
        this.fruit.y = y;
        return false;
      }
    })

    if (same === true) {
      this.random();
    }
  }




}
SnakeGameLogic.prototype.up = function () {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  this.direction = 'up';
}
SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  this.direction = 'down';
}
SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  this.direction = 'left';
}
SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');
  this.direction = 'right';
}
SnakeGameLogic.prototype.nextState = function () {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  // console.log(`nextState`);
  if (this.direction === 'right') {
    this.joints.unshift({ x: this.joints[0].x + 1, y: this.joints[0].y });
    if (!(this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y)) {
      this.joints.pop(this.joints.length - 1);
    } else {
      this.random();
    }
  }
  if (this.direction === 'left') {
    this.joints.unshift({ x: this.joints[0].x - 1, y: this.joints[0].y });
    if (!(this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y)) {
      this.joints.pop(this.joints.length - 1);
    } else {
      this.random();
    }
  }
  if (this.direction === 'up') {
    this.joints.unshift({ x: this.joints[0].x, y: this.joints[0].y - 1 });
    if (!(this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y)) {
      this.joints.pop(this.joints.length - 1);
    } else {
      this.random();
    }
  }
  if (this.direction === 'down') {
    this.joints.unshift({ x: this.joints[0].x, y: this.joints[0].y + 1});
    if (!(this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y)) {
      this.joints.pop(this.joints.length - 1);
    } else {
      this.random();
    }
  }

  // for (let i = 1; i < this.joints.length; i++) {
  //   if (this.joints[0].x === this.joints[i].x && this.joints[0].y === this.joints[i].y) {
  //     console.log('끝');
  //     return false;
  //   }
  // }

  const collison = this.joints.slice(1).some(item => {
    if (item.x === this.joints[0].x && item.y === this.joints[0].y) {
      return true;
    } else {
      return false;
    }
  });

  if (collison === true) {
    return false;
  }

  if (this.joints[0].x >= COLS || this.joints[0].x < 0) {
    return false;
  }
  if (this.joints[0].y >= ROWS || this.joints[0].y < 0) {
    return false;
  }
  return true;
}


export default SnakeGameLogic;
