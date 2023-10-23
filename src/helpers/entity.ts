import { Mesh, MeshStandardMaterial } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

import { colors } from '@/common/constants'

function createWallMesh(x: number, y: number) {
  const NODE_GEOMETRY = new RoundedBoxGeometry(1, 1, 1, 5, 0.1)
  const NODE_MATERIAL = new MeshStandardMaterial({
    color: colors.wall.fill
  })
  const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
  mesh.position.x = x
  mesh.position.z = y
  return mesh
}

function createMatchMesh(x: number, y: number) {
  const NODE_GEOMETRY = new RoundedBoxGeometry(0.8, 0.1, 0.8, 5, 0.1)
  const NODE_MATERIAL = new MeshStandardMaterial({
    color: colors.match.fill
  })
  const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
  mesh.position.x = x
  mesh.position.z = y
  return mesh
}

function createBlockMesh(x: number, y: number) {
  const NODE_GEOMETRY = new RoundedBoxGeometry(0.9, 0.9, 0.9, 5, 0.1)
  const NODE_MATERIAL = new MeshStandardMaterial({
    color: colors.block.fill
  })
  const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
  mesh.position.x = x
  mesh.position.z = y
  return mesh
}

function createMatchBlockMesh(x: number, y: number) {
  const NODE_GEOMETRY = new RoundedBoxGeometry(0.9, 0.9, 0.9, 5, 0.1)
  const NODE_MATERIAL = new MeshStandardMaterial({
    color: colors.matchBlock.fill
  })
  const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
  mesh.position.x = x
  mesh.position.z = y
  return mesh
}

function createPlayerMesh(x: number, y: number) {
  const NODE_GEOMETRY = new RoundedBoxGeometry(0.8, 0.8, 0.8, 5, 0.1)
  const NODE_MATERIAL = new MeshStandardMaterial({
    color: colors.player.fill
  })
  const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
  mesh.position.x = x
  mesh.position.z = y
  return mesh
}

export default {
  BLOCK: createBlockMesh,
  MATCH_BLOCK: createMatchBlockMesh,
  PLAYER: createPlayerMesh,
  MATCH: createMatchMesh,
  WALL: createWallMesh
}
