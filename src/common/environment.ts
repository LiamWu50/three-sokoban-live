import { Vector3, Vector4 } from 'three'

export const treeLayoutData = [
  new Vector4(-4, 0, 5, 1),
  new Vector4(-3, 0, 4, 1.2),
  new Vector4(-2, 0, 0, 0.8),
  new Vector4(-5, 0, -3, 1.3),
  new Vector4(-5, 0, -5, 2),
  new Vector4(-4, 0, -4, 1.5),
  new Vector4(-2, 0, -5, 1),
  new Vector4(0, 0, -2, 1.2),
  new Vector4(2, 0, -3, 1.2),
  new Vector4(4, 0, -5, 1.2),
  new Vector4(6, 0, -6, 1.3),
  new Vector4(5, 0, -5.5, 1),
  new Vector4(10, 0, -3, 1.8),
  new Vector4(12, 0, 0, 1.1),
  new Vector4(11, 0, 0, 1.3),
  new Vector4(11.5, 0, 1, 1.1),
  new Vector4(12, 0, 5, 1.5),
  new Vector4(11, 0, 6, 1.3),
  new Vector4(10.5, 0, 5.5, 1.1),
  new Vector4(11, 0, 10, 1.6),
  new Vector4(7, 0, 10, 1.1),
  new Vector4(18, 0, 2, 0.6)
]

export const getRockLayoutData = (resX: number) => [
  [new Vector3(-4, -0.5, 1), new Vector4(2, 8, 3, 2.8)],
  [new Vector3(-1, -0.5, -10), new Vector4(3, 2, 2.5, 1.5)],
  [new Vector3(-3, -0.5, 3), new Vector4(1, 1.5, 2, 0.8)],
  [new Vector3(resX + 5, -0.5, 3), new Vector4(3, 1, 3, 1)],
  [new Vector3(resX + 4, -0.5, 2), new Vector4(2, 2, 1, 1)],
  [new Vector3(resX + 6, -0.5, 6), new Vector4(2.8, 6.4, 2, 4)],
  [new Vector3(resX + 4, -0.5, 7), new Vector4(3, 2, 2.5, 3.2)],
  [new Vector3(resX + 7, -0.5, -2), new Vector4(1, 1, 1, 0)],
  [new Vector3(resX + 8, -0.5, -2), new Vector4(2, 4, 1.5, 0.5)],
  [new Vector3(-3, -0.5, 6), new Vector4(1, 3, 2, 0)],
  [new Vector3(-4, -0.5, 6), new Vector4(0.8, 0.6, 0.7, 0)],
  [new Vector3(resX / 2 + 5, -0.5, 10), new Vector4(2, 5.8, 2, 2)],
  [new Vector3(resX / 2 + 6, -0.5, 9.5), new Vector4(0.8, 1.4, 0.8, 2)]
]
