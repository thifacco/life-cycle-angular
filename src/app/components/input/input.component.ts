import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { ListaDeCompraService } from 'src/app/services/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges {

  @Input() itemEdit!: Item;

  valorItem!: string;
  editando = false;
  btnLabel = 'Salvar item';

  constructor(private listaDeCompraService: ListaDeCompraService) { }

  // checa as informações de entrada durante todo o ciclo de vida do componente
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['itemEdit'].firstChange) {
      this.editando = true;
      this.btnLabel = 'Editar item';
      this.valorItem = this.itemEdit?.nome;
    }
  }

  adicionarItem(): void {
    this.listaDeCompraService.adicionarItemNaLista(this.valorItem);
    this.limparCampo();
  }

  limparCampo(): void {
    this.valorItem = '';
  }

  editarItem(): void {
    this.listaDeCompraService.editarItemDaLista(this.itemEdit, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.btnLabel = 'Salvar item';
  }
}
