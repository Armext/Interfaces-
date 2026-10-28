import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Agrocampo } from './agrocampo';

describe('Agrocampo', () => {
  let component: Agrocampo;
  let fixture: ComponentFixture<Agrocampo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agrocampo],
    }).compileComponents();

    fixture = TestBed.createComponent(Agrocampo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
